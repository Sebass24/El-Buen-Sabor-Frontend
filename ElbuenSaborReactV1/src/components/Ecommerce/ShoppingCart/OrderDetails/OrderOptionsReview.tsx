import { useAppSelector } from "@app/Hooks";
import OrderTotalPrice from "./OrderTotalPrice";
import "./OrderTotalPrice.scss";
import Order from "@Models/Orders/Order";

interface Props {
    order: Order | null;
}

export default function OrderOptionsReview({ order: propOrder }: Props) {

    const { order: reduxOrder } = useAppSelector(state => state.cart);
    const order = propOrder || reduxOrder;

    console.log(order);

    return (
        <>
            <OrderTotalPrice order={order} />
            <div className="order-total-price-info">
                {order.deliveryMethod.description === "Envío a domicilio" ?
                    <>
                        <hr className="straight-line" />
                        <div className="separator">
                            <label className="total-products"><strong>{order.deliveryMethod.description}</strong></label >
                        </div >
                        <div className="separator">
                            <label><strong>Dirección:</strong></label>
                            <label style={{ textAlign: "right" }}>{order.address as string}</label>
                        </div >
                        <div className="separator">
                            <label><strong>Teléfono:</strong></label>
                            <label>{order.phone as string}</label>
                        </div >
                    </> :
                    <>
                        <div className="separator">
                            <label className="total-products"><strong>{order.deliveryMethod.description}</strong></label >
                        </div >
                    </>
                }
                <div className="separator">
                    <label>Forma de pago:</label>
                    <label><strong>{order.paymentMethod.description}</strong></label>
                </div>
            </div >
        </>
    )
}
