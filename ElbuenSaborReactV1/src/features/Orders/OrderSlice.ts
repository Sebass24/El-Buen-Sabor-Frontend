import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import Orders from "@Models/orders/Orders";
import { fetchOrders } from "./OrderThunks";
// Define a type for the Loading state
interface LoadingState {
  orders: Orders[];
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
    setOrders: (state, action: PayloadAction<Orders[]>) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<Orders>) => {
      state.orders.push(action.payload)
    },
    updateOrder: (state, action: PayloadAction<Orders>) => {
      const index = state.orders.findIndex(ing => ing.id == action.payload.id)
      state.orders[index] = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload
    })
  },
});

export const { updateOrder, setOrders, addOrder } = OrderSlice.actions;

export default OrderSlice.reducer;
