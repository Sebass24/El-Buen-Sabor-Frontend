import Base from "types/Base";
import Bill from "./Bill";

export default interface CreditNote extends Base {
  number: number;
  bill: Bill;
}