import Base from "@Models/Base";
import Product from "@Models/Product/Product";
import Order from "./Order";

export default interface OrderDetail extends Base {
    product: Product;
    quantity: number;
    order: Order;
}