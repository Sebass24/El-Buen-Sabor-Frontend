import { useAppSelector } from "@app/Hooks";
import OrderTotalPrice from "./OrderTotalPrice";
import "./OrderTotalPrice.scss";

export default function OrderOptionsReview() {

    const { order } = useAppSelector(state => state.cartProducts);

    return (
        <>
            <OrderTotalPrice />
            <div className="order-total-price-info">
                <div className="separator">
                    <label className="total-products"><strong>{order.deliveryMethod.description}</strong></label>
                </div>
                <div className="separator">
                    <label>Forma de pago:</label>
                    <label><strong>{order.paymentMethod.description}</strong></label>
                </div>
            </div>
        </>
    )
}
