
import { createAsyncThunk } from "@reduxjs/toolkit";
import CategoryProduct from "types/Product/ProductCategory";
import { getData } from "components/GenericFetch/GenericFetch";

export const fetchProductCategory = createAsyncThunk("ProductsCategory/fetch", async () => {
  const data: CategoryProduct[] = await getData<CategoryProduct[]>("/api/category");
  return data
})