import Base from "types/Base";
import Product from "types/Product/Product";

export default interface OrderDetail extends Base {
  product: Product
  quantity: number
}