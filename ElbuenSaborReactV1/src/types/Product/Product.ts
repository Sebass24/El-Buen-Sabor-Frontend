import Base from "../Base";
import ProductDetails from "./ProductDetail";
import Recipe from "./Recipe";
import Image from "./Image";
import ProductCategory from "./ProductCategory";

export default interface Product extends Base {
    name: string;
    description: string;
    shortDescription: string;
    available: boolean;
    cookingTime: string;
    productCategory: ProductCategory;
    productDetails: ProductDetails[];
    sellPrice: number;
    image: Image;
    recipe: Recipe;
}









