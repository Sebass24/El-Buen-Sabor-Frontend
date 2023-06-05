import { useAppDispatch, useAppSelector } from "@app/Hooks";
import { setDeliveryMethod, setPaymentMethod } from "@features/ShoppingCart/CartProducts";
import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";
import DeliveryInfo from "./DeliveryInfo";
import OrderTotalPrice from "./OrderTotalPrice";
import "./OrderOptions.scss";

interface FormValues {
    telefono: string;
    direccion: string;
    departamento: string;
}

const initialValues: FormValues = {
    telefono: '',
    direccion: '',
    departamento: '',
};


export default function OrderOptions() {

    const dispatch = useAppDispatch();
    const { order } = useAppSelector(state => state.cartProducts);

    const handleDeliveryMethodChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setDeliveryMethod(event.target.value));
    };

    const handlePaymentMethodChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setPaymentMethod(event.target.value));
    };

    const handleSubmit = (values: FormValues) => {
        // Handle form submission
        console.log(values);
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
                    value="Retiro en el local"
                    checked={order.deliveryMethod === 'Retiro en el local'}
                    onChange={handleDeliveryMethodChange}
                />
                <Form.Check
                    type="radio"
                    label="Envío a domicilio"
                    value="Envío a domicilio"
                    checked={order.deliveryMethod === 'Envío a domicilio'}
                    onChange={handleDeliveryMethodChange}
                />
            </div>
            {order.deliveryMethod === "Envío a domicilio" ?
                <DeliveryInfo />
                : ("")}
            <hr className="straight-line" />
            {order.deliveryMethod === "Retiro en el local" ?
                (<span>
                    <label>Forma de pago:</label><br />
                    <Form.Check
                        type="radio"
                        label="Efectivo"
                        value="Efectivo"
                        checked={order.paymentMethod === 'Efectivo'}
                        onChange={handlePaymentMethodChange}
                    />
                    <Form.Check
                        type="radio"
                        label="Mercado Pago"
                        value="Mercado Pago"
                        checked={order.paymentMethod === 'Mercado Pago'}
                        onChange={handlePaymentMethodChange}
                    />
                </span>)
                : (<span>
                    <label>Forma de pago:</label>
                    <Form.Check
                        type="radio"
                        label="Mercado Pago"
                        value="Mercado Pago"
                        checked={order.paymentMethod === 'Mercado Pago'}
                        onChange={handlePaymentMethodChange}
                    />
                </span>)}
        </div>
    )
}
