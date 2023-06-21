import Base from "types/Base";
import User from "types/Users/User";
import Phone from "types/Users/Phone";
import Address from "types/Users/Address";
import DeliveryMethod from "types/orderFixed/DeliveryMethod";
import OrderStatus from "types/orderFixed/OrderStatus";
import PaymentMethod from "types/orderFixed/PaymentMethod";
import OrderDetail from "types/orderFixed/OrderDetail";

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
