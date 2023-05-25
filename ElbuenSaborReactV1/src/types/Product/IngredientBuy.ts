import Base from "../Base";

export default interface IngredientBuy extends Base {
  Ingredient: string;
  Cuantity: number
  PriceCost: number;
}