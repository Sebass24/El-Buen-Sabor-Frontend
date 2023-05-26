import Ingredient from "@Models/Product/Ingredient";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchIngredients } from "./IngredientsThunks";
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
    addIngredient: (state, action: PayloadAction<Ingredient>) => {
      state.Ingredients.push(action.payload)
    },
    updateIngredient: (state, action: PayloadAction<Ingredient>) => {
      const index = state.Ingredients.findIndex(ing => ing.id == action.payload.id)
      state.Ingredients[index] = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.Ingredients = action.payload
    })
  },
});

export const { setIngredients, addIngredient, updateIngredient } = IngredientSlice.actions;

export default IngredientSlice.reducer;
