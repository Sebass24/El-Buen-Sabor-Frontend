import { useAppDispatch, useAppSelector } from "@app/Hooks";
import { setDeliveryMethod, setPaymentMethod } from "@features/ShoppingCart/CartProducts";
import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";
import DeliveryInfo from "./DeliveryInfo";
import OrderTotalPrice from "./OrderTotalPrice";
import "./OrderOptions.scss";
import { getDeliveryMethodById, getPaymentMethodById } from "@services/order";

export default function OrderOptions() {

    const dispatch = useAppDispatch();
    const { order } = useAppSelector(state => state.cartProducts);

    const handleDeliveryMethodChange = async (event: ChangeEvent<HTMLInputElement>) => {
        try {
            const deliveryMethod = await getDeliveryMethodById(Number(event.target.value));
            dispatch(setDeliveryMethod(deliveryMethod));
        } catch (error) {
            console.log(error);
        }
    };

    const handlePaymentMethodChange = async (event: ChangeEvent<HTMLInputElement>) => {
        try {
            const paymentMethod = await getPaymentMethodById(Number(event.target.value));
            dispatch(setPaymentMethod(paymentMethod));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="order-options">
            <OrderTotalPrice />
            <hr className="straight-line" />
            <div className="delivery-options">
                <label>Seleccionar:</label>
                <Form.Check
                    type="radio"
                    label="Retiro en el local"
                    value="2"
                    checked={order.deliveryMethod.id === 2}
                    onChange={handleDeliveryMethodChange}
                />
                <Form.Check
                    type="radio"
                    label="Envío a domicilio"
                    value="1"
                    checked={order.deliveryMethod.id === 1}
                    onChange={handleDeliveryMethodChange}
                />
            </div>
            {order.deliveryMethod.id === 1 ?
                <DeliveryInfo />
                : ("")}
            <hr className="straight-line" />
            {order.deliveryMethod.id === 2 ?
                (<span>
                    <label>Forma de pago:</label><br />
                    <Form.Check
                        type="radio"
                        label="Efectivo"
                        value="1"
                        checked={order.paymentMethod.id === 1}
                        onChange={handlePaymentMethodChange}
                    />
                    <Form.Check
                        type="radio"
                        label="Mercado Pago"
                        value="2"
                        checked={order.paymentMethod.id === 2}
                        onChange={handlePaymentMethodChange}
                    />
                </span>)
                : (<span>
                    <label>Forma de pago:</label>
                    <Form.Check
                        type="radio"
                        label="Mercado Pago"
                        value="2"
                        checked={order.paymentMethod.id === 2}
                        onChange={handlePaymentMethodChange}
                    />
                </span>)}
        </div>
    )
}
