import Ingredientcategory from "@Models/Product/IngredientCategory";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchIngredientCategory } from "./IngredientCategoryThunk";
// Define a type for the Loading state
interface FirsState {
  IngredientsCategories: Ingredientcategory[];
}

// Define the initial state using that type
const initialState: FirsState = {
  IngredientsCategories: [],
};

export const IngredientCategorySlice = createSlice({
  name: "IngredientsCategory",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIngredientsCategories: (state, action: PayloadAction<Ingredientcategory[]>) => {
      state.IngredientsCategories = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchIngredientCategory.fulfilled, (state, action) => {
      state.IngredientsCategories = action.payload
    })
  },
});

export const { setIngredientsCategories } = IngredientCategorySlice.actions;

export default IngredientCategorySlice.reducer;
