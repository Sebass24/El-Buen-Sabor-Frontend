import Base from "types/Base";
import Order from 'types/orderFixed/Order';

export default interface MercadoPagoPayment extends Base {
  paymentId: number;
  order: Order;
}