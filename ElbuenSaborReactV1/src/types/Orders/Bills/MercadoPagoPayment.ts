import Base from "@Models/Base";
import Order from "../Order";

export default interface MercadoPagoPayment extends Base {
    paymentId: number;
    order: Order;
}