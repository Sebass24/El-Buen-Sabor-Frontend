import Base from "@Models/Base";
import User from "@Models/Users/User";
import Phone from "@Models/Users/Phone";
import Address from "@Models/Users/Address";
import DeliveryMethod from "@Models/orders/DeliveryMethod";
import OrderStatus from "@Models/orders/OrderStatus";
import PaymentMethod from "@Models/orders/PaymentMethod";
import OrderDetail from "@Models/orders/OrderDetail";

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
