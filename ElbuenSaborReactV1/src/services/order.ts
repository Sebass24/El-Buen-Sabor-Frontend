import DeliveryMethod from "types/order/DeliveryMethod";
import Order from "types/order/Order";
import PaymentMethod from "types/order/PaymentMethod";
import { deleteData, getData } from "components/GenericFetch/GenericFetch";
import { getDataWithBody } from "./generic";

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

export async function getUserOrders(id: number) {
  const url = `/api/order/byUserID/${id}`;
  const orders = await getData<Order[]>(url);
  return orders;
}

interface orderItem {
  code: string,
  title: string,
  description: string,
  price: number,
}

export async function createPreferenceMP(order: orderItem) {
  const url = "/api/mercadopago/createAndRedirect";
  const response = await getDataWithBody(url, order);
  return response;
}

export async function deleteOrder(id: number) {
  const url = `/api/order/${id}`;
  await deleteData(url);
}