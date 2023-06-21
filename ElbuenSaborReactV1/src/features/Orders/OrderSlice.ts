import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { fetchOrders } from "./OrderThunks";
import Order from "../../types/orders/Order";
import { boolean } from "yup";
// Define a type for the Loading state
interface LoadingState {
  orders: Order[];
}

// Define the initial state using that type
const initialState: LoadingState = {
  orders: [],
};

export const OrderSlice = createSlice({
  name: "Ingredients",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload)
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      const index = state.orders.findIndex(ing => ing.id == action.payload.id)
      state.orders[index] = action.payload
    },
    UpdateStateOrder: (state, action: PayloadAction<number | undefined>) => {
      const index = state.orders.findIndex(ing => ing.id == action.payload)
      state.orders[index] = { ...state.orders[index], change: true }
    },
    UpdateStateOrderFalse: (state, action: PayloadAction<number | undefined>) => {
      const index = state.orders.findIndex(ing => ing.id == action.payload)
      state.orders[index] = { ...state.orders[index], change: false }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload
    })
  },
});

export const { updateOrder, setOrders, addOrder, UpdateStateOrder, UpdateStateOrderFalse } = OrderSlice.actions;

export default OrderSlice.reducer;
