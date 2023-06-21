import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { fetchOrdersCook } from "./OrderCookThunk";
import Order from "types/orderFixed/Order";
// Define a type for the Loading state
interface LoadingState {
  orders: Order[];
}

// Define the initial state using that type
const initialState: LoadingState = {
  orders: [],
};

export const OrderCookSlice = createSlice({
  name: "orderCook",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setOrdersCook: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    addOrderCook: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    updateOrderCook: (state, action: PayloadAction<Order>) => {
      const index = state.orders.findIndex(
        (ing) => ing.id == action.payload.id
      );
      if (action.payload.orderStatus.id === 4) {
        state.orders = state.orders.filter((o) => o.id != action.payload.id);
        return;
      }
      state.orders[index] = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchOrdersCook.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
});

export const { updateOrderCook, setOrdersCook, addOrderCook } =
  OrderCookSlice.actions;

export default OrderCookSlice.reducer;
