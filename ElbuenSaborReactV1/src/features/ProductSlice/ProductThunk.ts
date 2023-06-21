import Product from "types/Product/Product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "components/GenericFetch/GenericFetch";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const data: Product[] = await getData<Product[]>("/api/product");
  return data
})


