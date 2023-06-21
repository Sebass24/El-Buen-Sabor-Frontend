import Base from "types/Base";
import User from "types/Users/User";
import Phone from "types/Users/Phone";
import Address from "types/Users/Address";
import DeliveryMethod from "types/orders/DeliveryMethod";
import OrderStatus from "types/orders/OrderStatus";
import PaymentMethod from "types/orders/PaymentMethod";
import OrderDetail from "types/orders/OrderDetail";

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
  address: Address | string;
  phone: Phone | string;
  change?: boolean
}
