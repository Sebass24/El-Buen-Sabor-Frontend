import Base from "types/Base";
import User from "types/Users/User";
import DeliveryMethod from "types/order/DeliveryMethod";
import OrderStatus from "types/order/OrderStatus";
import PaymentMethod from "types/order/PaymentMethod";
import OrderDetail from "types/order/OrderDetail";

export default interface Order extends Base {
  deliveryMethod: DeliveryMethod;
  date: Date | string;
  orderStatus: OrderStatus;
  estimatedTime: Date;
  paymentMethod: PaymentMethod;
  paid: boolean;
  user: User;
  orderDetails: OrderDetail[];
  total: number;
  discount: number;
  address: string;
  phone: string;
  change?: boolean
}
