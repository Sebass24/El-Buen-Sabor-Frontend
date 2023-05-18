import Ingredient from "@Models/Product/Ingredient";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// Define a type for the Loading state
interface LoadingState {
  Ingredients: Ingredient[];
}

// Define the initial state using that type
const initialState: LoadingState = {
  Ingredients: [],
};

export const IngredientSlice = createSlice({
  name: "Ingredients",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<Ingredient[]>) => {
      state.Ingredients = action.payload;
    },
  },
});

export const { setIngredients } = IngredientSlice.actions;

export default IngredientSlice.reducer;
