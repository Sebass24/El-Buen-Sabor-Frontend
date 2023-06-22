import Order from "types/order/Order";
import OrderDetail from "types/order/OrderDetail"
import { getOrderById } from "@services/order";
import HeaderEcommerce from "components/Ecommerce/HeaderEcommerce/HeaderEcommerce";
import OrderOptionsReview from "components/Ecommerce/ShoppingCart/OrderDetails/OrderOptionsReview"
import ShoppingCartProductDetail from "components/Ecommerce/ShoppingCart/ShoppingCartProductDetail"
import { useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./ClientOrderDetail.scss";
import { useAppDispatch } from "@app/Hooks";
import { resetOrderDetails } from "@features/ShoppingCart/CartProducts";
import AlertMessage from "components/AlertMessage";

export default function ClientOrderDetail() {

  const { idorder } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const success = queryParams.get("success");

  const getOrder = async () => {
    try {
      const dborder: Order = await getOrderById(parseInt(idorder!));
      console.log(dborder);
      setOrder(dborder);
    } catch (error) {
      console.log(error);
    }
  }

  const getEstimatedTime = () => {
    const timestamp = order?.estimatedTime;
    if (timestamp) {
      const date = new Date(timestamp);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const timeString = `${hours}:${minutes.toString().padStart(2, '0')}`;
      return timeString;
    }
    return '';
  }

  const handleBillDownload = () => {
    try {
      const url = `${import.meta.env.VITE_BILL_DOWNLOAD}/api/bill/download-bill/${order?.id}`;
      window.location.href = url;
    } catch (error) {
      console.log(error);
      setShowMessage(true);
    }
  }

  const handleCreditNoteDownload = () => {
    try {
      const url = `${import.meta.env.VITE_BILL_DOWNLOAD}/api/credit-note/download-credit-note/${order?.id}`;
      window.location.href = url;
    } catch (error) {
      console.log(error);
      setShowMessage(true);
    }
  }

  useEffect(() => {
    getOrder();
  }, [])

  useEffect(() => {
    if (success) {
      dispatch(resetOrderDetails());
    }
  }, [])

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };

    const formatter = new Intl.DateTimeFormat('es-AR', options);
    return formatter.format(date);
  }

  return (
    <>
      <HeaderEcommerce />
      <div className="cart-container-review" >
        <Row><label className="page-name">DETALLE DE PEDIDO</label></Row>
        <div className="order-detail-container-review" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="cart-products-container-review">
            {order?.orderDetails.map((orderDetail: OrderDetail, index: number) => (
              <ShoppingCartProductDetail
                key={index}
                order={orderDetail}
                //set the shopping cart product detail in reviewmode to disable product quantity edition
                reviewMode={true}
              />
            ))}
          </div>
          <div className="order-options-container-review">
            <div className="separator">
              <label className="title-order-id">Pedido nro:</label>
              <label className="title-order-id" style={{ textAlign: "right" }}>{order?.id}</label>
            </div >
            <div className="separator">
              <label className="title-order-id">Fecha:</label>
              <label className="title-order-id">{formatDate(order?.date as string)}</label>
            </div>
            <OrderOptionsReview order={order} />
            {order?.orderStatus.description === "Cancelado" && order?.paid ?
              <Button className={"btn-cart-review"}
                style={{ width: "100%" }}
                onClick={handleCreditNoteDownload} >
                Ver nota de crédito
              </Button> : <></>}
            {order?.paid ?
              <Button className={"btn-cart-review"}
                style={{ width: "100%" }}
                onClick={handleBillDownload} >
                Ver factura
              </Button> : <></>}
            <div>
              {order?.orderStatus.description === "Entregado" ? (
                <Button className="time-button" disabled>
                  Entregado
                </Button>
              ) : order?.orderStatus.description === "Listo" ? (
                <Button className="time-button" disabled>
                  Tu pedido ya está listo {order.deliveryMethod.description === "Envío a domicilio" ?
                    "para enviarlo" : ""}
                </Button>
              ) : order?.orderStatus.description === "Cancelado" ? (
                <Button className="time-button" disabled style={{ backgroundColor: "#EC5800", borderColor: "#EC5800" }}>
                  Cancelado
                </Button>
              ) : (
                <Button className="time-button" disabled>
                  Hora estimada: {getEstimatedTime()}
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="button-container-1">
          <Button className="btn-cart" onClick={() => (navigate("/"))}>Volver al catálogo</Button>
          <Button type="button" className="btn-cart" onClick={() => (navigate(-1))}>
            Volver
          </Button>
        </div>
        {showMessage ?
          <AlertMessage
            severity="error"
            onClose={(() => { setShowMessage(false) })}
            label={"Error al descargar el archivo."} />
          : ""}
      </div >
    </>
  )
}
