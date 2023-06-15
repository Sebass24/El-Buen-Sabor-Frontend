import { useAppSelector } from "@app/Hooks";
import OrderTotalPrice from "./OrderTotalPrice";
import "./OrderTotalPrice.scss";

export default function OrderOptionsReview() {

    const { order } = useAppSelector(state => state.cart);

    return (
        <>
            <OrderTotalPrice />
            <div className="order-total-price-info">
                {order.deliveryMethod.description === "Envío a domicilio" ?
                    <>
                        <hr className="straight-line" />
                        <div className="separator">
                            <label className="total-products"><strong>{order.deliveryMethod.description}</strong></label >
                        </div >
                        <div className="separator">
                            <label><strong>Dirección:</strong></label>
                            <label>{order.address as string}</label>
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
