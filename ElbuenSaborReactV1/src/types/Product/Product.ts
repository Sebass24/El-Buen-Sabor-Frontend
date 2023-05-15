import Base from "../Base";
import ProductDetail from "./ProductDetail";
import Price from "./Price";
import Recipe from "./Recipe";

export default interface Product extends Base {
    name: string;
    description: string;
    shortDescription: string;
    available: boolean;
    cookingTime?: string;
    productCategory: string;
    productDetail?: ProductDetail[];
    price: Price;
    image: string;
    recipe?: Recipe;
}









