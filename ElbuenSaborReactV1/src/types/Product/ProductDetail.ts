import Base from "../Base";
import Ingredient from "./Ingredient";

export default interface ProductDetail extends Base {
    ingredient: Ingredient;
    quantity: number;
}