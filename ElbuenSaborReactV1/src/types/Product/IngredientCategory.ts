import Base from "../Base";

export default interface IngredientCategory extends Base {
    name: string; 
    subIngredientCategories: IngredientCategory[];  
    parentCategory: IngredientCategory;
}