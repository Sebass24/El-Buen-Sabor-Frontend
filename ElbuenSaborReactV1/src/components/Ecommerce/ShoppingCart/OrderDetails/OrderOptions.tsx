import { useAppDispatch, useAppSelector } from "@app/Hooks";
import { setDeliveryMethod, setPaymentMethod } from "@features/ShoppingCart/CartProducts";
import { useState, useEffect, ChangeEvent } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DeliveryInfo from "./DeliveryInfo";
import OrderTotalPrice from "./OrderTotalPrice";

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
        <div>
            <OrderTotalPrice />
            <hr className="straight-line" />
            <span>
                <span>Seleccionar</span>
                <label>
                    <input
                        type="radio"
                        value="Retiro en el local"
                        checked={order.deliveryMethod === 'Retiro en el local'}
                        onChange={handleDeliveryMethodChange}
                    />
                    Retiro en el local
                </label>
                <label>
                    <input
                        type="radio"
                        value="Envío a domicilio"
                        checked={order.deliveryMethod === 'Envío a domicilio'}
                        onChange={handleDeliveryMethodChange}
                    />
                    Envío a domicilio
                </label>
            </span><br />
            {order.deliveryMethod === "Envío a domicilio" ?
                <DeliveryInfo />
                : ("")}
            <hr className="straight-line" />
            {order.deliveryMethod === "Retiro en el local" ?
                (<span>
                    <span>Forma de pago:</span><br />
                    <label>
                        <input
                            type="radio"
                            value="Efectivo"
                            checked={order.paymentMethod === 'Efectivo'}
                            onChange={handlePaymentMethodChange}
                        />
                        Efectivo
                    </label><br />
                    <label>
                        <input
                            type="radio"
                            value="Mercado Pago"
                            checked={order.paymentMethod === 'Mercado Pago'}
                            onChange={handlePaymentMethodChange}
                        />
                        Mercado Pago
                    </label>
                </span>)
                : (<span>
                    <span>Forma de pago:</span><br />
                    <label>
                        <input
                            type="radio"
                            value="Mercado Pago"
                            checked={order.paymentMethod === 'Mercado Pago'}
                            onChange={handlePaymentMethodChange}
                        />
                        Mercado Pago
                    </label>
                </span>)}
        </div>
    )
}
