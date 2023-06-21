import Base from "types/Base";
import Order from 'types/Orders/Order';

export default interface Bill extends Base {
  number: number;
  order: Order;
  cancelled: boolean;
}