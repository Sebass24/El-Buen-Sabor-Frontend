import Order from "../../types/orders/Order";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "components/GenericFetch/GenericFetch";

export const fetchOrdersCook = createAsyncThunk("orderCook/fetch", async () => {
  const data: Order[] = await getData<Order[]>("/api/order/byStatus/En cocina");
  return data;
});
