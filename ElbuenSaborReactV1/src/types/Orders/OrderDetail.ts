import Base from "@Models/Base";
import Product from "@Models/Product/Product";

export default interface OrderDetail extends Base {
  product: Product
  quantity: number
}