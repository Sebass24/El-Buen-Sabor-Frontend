import DeliveryMethod from "@Models/Orders/DeliveryMethod";
import Order from "@Models/Orders/Order";
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

export async function getOrderById(id: number) {
    const url = `/api/order/${id}`;
    const order = await getData<Order>(url);
    return order;
}

export async function getOrderBill(id: number) {
    const url = `/api/bill/download-bill/${id}`;
    const bill = await getData<string>(url);
    return bill;
}