import Base from "../Base";
import ProductDetail from "./ProductDetail";
import Recipe from "./Recipe";
import ProductCategory from "./ProductCategory";
import Image from "./Image";

export default interface Product extends Base {
  name: string;
  description: string;
  shortDescription: string;
  available: boolean;
  cookingTime?: number | "";
  productCategory: ProductCategory;
  productDetails?: ProductDetail[];
  sellPrice: number | "";
  image: Image;
  recipe?: Recipe;
}
