import Order from "@Models/Orders/Order";
import OrderDetail from "@Models/Orders/OrderDetail"
import { getOrderBill, getOrderById } from "@services/order";
import HeaderEcommerce from "components/Ecommerce/HeaderEcommerce/HeaderEcommerce";
import OrderOptionsReview from "components/Ecommerce/ShoppingCart/OrderDetails/OrderOptionsReview"
import ShoppingCartProductDetail from "components/Ecommerce/ShoppingCart/ShoppingCartProductDetail"
import { useEffect, useState } from "react";
import { Alert, Button, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom";
import "./ClientOrderDetail.scss";

export default function ClientOrderDetail() {

    const { idorder } = useParams();
    const [order, setOrder] = useState<Order | null>(null);
    const navigate = useNavigate();

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
                            {order?.orderStatus.description === "Entregado" ?
                                <Button
                                    className={"time-button"} disabled>
                                    Entregado
                                </Button> :
                                <Button
                                    className={"time-button"} disabled>
                                    Hora estimada: {getEstimatedTime()}
                                </Button>}
                        </div>
                    </div>
                </div>
                {/*  {
                showMessage ?
                    <div className="alert-container">
                        <Alert severity="error" onClose={() => { setShowMessage(false) }}>Error al descargar la factura.</Alert>
                    </div>
                    : ""
            } */}
            </div >
        </>
    )
}
