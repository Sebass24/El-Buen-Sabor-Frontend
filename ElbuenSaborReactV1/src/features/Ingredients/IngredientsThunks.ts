import Ingredient from "@Models/Product/Ingredient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "components/GenericFetch/GenericFetch";

export const fetchIngredients = createAsyncThunk("ingredients/fetch", async () => {
  const data: Ingredient[] = await getData<Ingredient[]>("/api/ingredient");
  return data
})