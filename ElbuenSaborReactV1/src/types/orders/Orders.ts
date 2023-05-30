import Base from "@Models/Base";
import User from "@Models/user/User";
import DeliveryMethod from "@Models/Orders/DeliveryMethod";
import OrderStatus from "@Models/Orders/OrderStatus";
import paymentMethod from "@Models/Orders/PaymentMethod";
import OrderDetail from "@Models/Orders/OrderDetail";

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