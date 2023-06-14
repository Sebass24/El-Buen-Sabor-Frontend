import DeliveryMethod from "@Models/Orders/DeliveryMethod";
import PaymentMethod from "@Models/Orders/PaymentMethod";
import { getData } from "components/GenericFetch/GenericFetch";

export async function getDeliveryMethodById(id: number) {
    const url = `/api/deliverymethod/${id}`;
    const deliveryMethod = await getData<DeliveryMethod>(url);
    return deliveryMethod;
}

export async function getPaymentMethodById(id: number) {
    const url = `/api/paymentmethod/${id}`;
    const paymentMethod = await getData<PaymentMethod>(url);
    return paymentMethod;
}