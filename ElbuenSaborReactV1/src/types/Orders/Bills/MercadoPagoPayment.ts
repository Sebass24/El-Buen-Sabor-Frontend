import Base from "@Models/Base";
import Order from '@Models/Orders/Order';

export default interface MercadoPagoPayment extends Base {
  paymentId: number;
  order: Order;
}