import Base from "../Base";
import IngredientCategory from "./IngredientCategory";
import Price from "./Price";

export default interface Ingredient extends Base {
  name: string;
  ingredientCategory: IngredientCategory;
  minimumStock: number;
  currentStock: number;
  measurementUnit: string;
  costPrice: Price;
}
