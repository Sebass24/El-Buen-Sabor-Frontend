import Base from "../Base";
import IngredientCategory from "./IngredientCategory";
import Price from "./Price";

export default interface Ingredient extends Base {
    ingredientCategory: IngredientCategory;
    minimumStock: number; 
    currentStock: number; 
    measurementUnit: string;
    prices: Price[];
}