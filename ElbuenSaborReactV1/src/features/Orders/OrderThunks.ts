import Orders from "@Models/orders/Orders";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "components/GenericFetch/GenericFetch";

export const fetchOrders = createAsyncThunk("order/fetch", async () => {
  const data: Orders[] = await getData<Orders[]>("/api/order");
  return data
})