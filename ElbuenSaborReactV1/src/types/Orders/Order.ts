import Base from "@Models/Base";
import User from "@Models/Users/User";
import Phone from "@Models/Users/Phone";
import Address from "@Models/Users/Address";
import DeliveryMethod from "@Models/Orders/DeliveryMethod";
import OrderStatus from "@Models/Orders/OrderStatus";
import PaymentMethod from "@Models/Orders/PaymentMethod";
import OrderDetail from "@Models/Orders/OrderDetail";

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
