import Base from "@Models/Base";
import User from "@Models/Users/User";
import DeliveryMethod from "@Models/Orders/DeliveryMethod";
import OrderStatus from "@Models/Orders/OrderStatus";
import PaymentMethod from "@Models/Orders/PaymentMethod";
import OrderDetail from "@Models/Orders/OrderDetail";
import Phone from "@Models/Users/Phone";
import Address from "@Models/Users/Address";

export default interface Order extends Base {
  deliveryMethod: DeliveryMethod | string;
  date: Date | string;
  orderStatus: OrderStatus | string;
  estimatedTime: Date;
  paymentMethod: PaymentMethod | string;
  paid: boolean;
  user: User;
  orderDetails: OrderDetail[];
  total: number;
  discount: number;
  address: Address;
  phone: Phone | string;
}
