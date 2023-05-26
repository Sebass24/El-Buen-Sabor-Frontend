import Base from "../Base";
import Ingredient from "./Ingredient/Ingredient";

export default interface productDetails extends Base {
  ingredient: Ingredient;
  quantity: number;
  measurementUnit: string;
}
