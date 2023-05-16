import Base from "../Base";

export default interface IngredientCategory extends Base {
    name: string;
    parentCategory: IngredientCategory;
}