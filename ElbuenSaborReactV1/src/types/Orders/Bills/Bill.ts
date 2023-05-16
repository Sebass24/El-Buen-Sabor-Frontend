import Base from "@Models/Base";
import Order from "../Order";

export default interface Bill extends Base {
    number: number;
    order: Order;
    cancelled: boolean;
}