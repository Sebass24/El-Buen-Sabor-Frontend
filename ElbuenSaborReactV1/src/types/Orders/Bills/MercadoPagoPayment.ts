import Base from "types/Base";
import Order from 'types/orders/Order';

export default interface MercadoPagoPayment extends Base {
  paymentId: number;
  order: Order;
}