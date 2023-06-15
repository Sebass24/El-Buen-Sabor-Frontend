import Order from "../../types/Orders/Order";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "components/GenericFetch/GenericFetch";

export const fetchOrders = createAsyncThunk("order/fetch", async () => {
  const data: Order[] = await getData<Order[]>("/api/order");
  return data
})