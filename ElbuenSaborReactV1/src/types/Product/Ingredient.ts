import Base from "../Base";
import IngredientCategory from "./Ingredient/IngredientCategory";

export default interface Ingredient extends Base {
  name: string;
  ingredientCategory: IngredientCategory;
  minimumStock: number | "";
  currentStock: number | "";
  measurementUnit: string;
  costPrice: number | "";
}
