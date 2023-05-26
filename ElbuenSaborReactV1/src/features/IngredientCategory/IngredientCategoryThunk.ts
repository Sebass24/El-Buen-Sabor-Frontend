import Category from "@Models/Product/Category";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "components/GenericFetch/GenericFetch";

export const fetchIngredientCategory = createAsyncThunk("ingredientsCategory/fetch", async () => {
  const data: Category[] = await getData<Category[]>("/api/rubro");
  return data
})