import Base from "../Base";
import Ingredient from "./Ingredient";

export default interface IngredientBuy extends Base {
  ingredient: Ingredient;
  Cuantity: number
  PriceCost: number;
}