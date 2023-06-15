import Base from "@Models/Base";
import Order from '@Models/orders/Order';

export default interface Bill extends Base {
    number: number;
    order: Order;
    cancelled: boolean;
}