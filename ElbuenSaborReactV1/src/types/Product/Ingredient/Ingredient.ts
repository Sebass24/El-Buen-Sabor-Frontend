import Base from "../../Base";
import IngredientCategory from "./IngredientCategory";

export default interface Ingredient extends Base {
  name: string;
  category: IngredientCategory;
  minimumStock: number;
  currentStock: number;
  measurementUnit: MeasurementUnit;
  costPrice: number;
}