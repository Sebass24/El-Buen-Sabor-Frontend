import { configureStore } from "@reduxjs/toolkit";
import IngredientReducer from "../features/foods/IngredientSlice"


export const store = configureStore({
  reducer: { ingredient: IngredientReducer },
})