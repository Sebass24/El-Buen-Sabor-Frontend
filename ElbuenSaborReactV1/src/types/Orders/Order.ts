import Base from "@Models/Base";
import User from "@Models/Users/User";
import DeliveryMethod from "./DeliveryMethod";
import OrderStatus from "./OrderStatus";
import PaymentMethod from "./PaymentMethod";
import OrderDetail from "./OrderDetail";

export default interface Order extends Base {
  deliveryMethod: DeliveryMethod | string;
  date: Date;
  orderStatus: OrderStatus | string;
  estimatedTime: Date;
  paymentMethod: PaymentMethod | string;
  paid: boolean;
  user: User | number;
  orderDetails: OrderDetail;
  total: number;
  discount: number;
}
