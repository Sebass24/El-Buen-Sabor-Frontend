import Base from "types/Base";
import Order from 'types/Orders/Order';

export default interface MercadoPagoPayment extends Base {
  paymentId: number;
  order: Order;
}