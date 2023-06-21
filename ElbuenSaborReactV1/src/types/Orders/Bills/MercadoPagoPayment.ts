import Base from "@Models/Base";
import Order from '@Models/orders/Order';

export default interface MercadoPagoPayment extends Base {
  paymentId: number;
  order: Order;
}