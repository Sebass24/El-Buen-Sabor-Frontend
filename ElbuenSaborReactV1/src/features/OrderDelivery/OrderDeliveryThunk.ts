import Order from "../../types/order/Order";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "components/GenericFetch/GenericFetch";

export const fetchOrdersDelivery = createAsyncThunk("orderDelivery/fetch", async () => {
  const data: Order[] = await getData<Order[]>("/api/order/byStatus/En delivery");
  return data;
});
