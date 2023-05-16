import Base from "@Models/Base";
import DeliveryMethod from "./DeliveryMethod";
import OrderStatus from "./OrderStatus";
import PaymentMethod from "./PaymentMethod";
import User from "@Models/Users/User";
import OrderDetail from "./OrderDetail";

export default interface Order extends Base {
    deliveryMethod: DeliveryMethod;
    date: Date;
    orderStatus: OrderStatus;
    estimatedTime: Date;
    paymentMethod: PaymentMethod;
    paid: boolean;
    user: User;
    orderDetails: OrderDetail;
    total: number;
    discount: number;
}