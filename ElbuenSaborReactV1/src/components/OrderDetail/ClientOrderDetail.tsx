import Order from "@Models/Orders/Order";
import OrderDetail from "@Models/Orders/OrderDetail"
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

export default function ClientOrderDetail() {

    const { idorder } = useParams();
    const [order, setOrder] = useState<Order | null>(null);
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
        }
    }

    const handleCreditNoteDownload = () => {
        try {
            const url = `${import.meta.env.VITE_BILL_DOWNLOAD}/api/credit-note/download-credit-note/${order?.id}`;
            window.location.href = url;
        } catch (error) {
            console.log(error);
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
                        <OrderOptionsReview order={order} />
                        {order?.orderStatus.description === "Cancelado" ?
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
                </div>
                {/* {showMessage ?
                    <AlertMessage
                        severity="error"
                        onClose={(() => { setShowMessage(false) })}
                        label={"Error al descargar la factura"} />
                    : ""} */}
            </div >
        </>
    )
}
