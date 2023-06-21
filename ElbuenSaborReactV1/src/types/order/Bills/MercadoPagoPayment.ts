import Base from "types/Base";
import Order from 'types/order/Order';

export default interface MercadoPagoPayment extends Base {
  paymentId: number;
  order: Order;
}