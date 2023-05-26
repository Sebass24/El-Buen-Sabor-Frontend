import Base from "@Models/Base";
import DeliveryMethod from "./DeliveryMethod";
import OrderStatus from "./OrderStatus";
import paymentMethod from "./PaymentMethod";
import User from "@Models/user/User";
import OrderDetail from "./OrderDetail";

export default interface Orders extends Base {
  deliveryMethod: DeliveryMethod
  date: Date
  orderStatus: OrderStatus
  estimatedTime: Date
  paymentMethod: paymentMethod
  paid: boolean
  user: User
  orderDetails: OrderDetail[]
  total: number
  discount: number
}