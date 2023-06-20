import Base from "../../Base";
import IngredientCategory from "./IngredientCategory";
import { MeasurementUnit } from "./MeasurementUnit";

export default interface Ingredient extends Base {
  name: string;
  category: IngredientCategory;
  minimumStock: number;
  currentStock: number;
  measurementUnit: MeasurementUnit;
  costPrice: number;
}