import { PayloadAction, createSlice } from "@reduxjs/toolkit";


import Order from "types/order/Order";
import { fetchOrdersDelivery } from "./OrderDeliveryThunk";
// Define a type for the Loading state
interface LoadingState {
  orders: Order[];
}

// Define the initial state using that type
const initialState: LoadingState = {
  orders: [],
};

export const OrderDeliverySlice = createSlice({
  name: "orderDelivery",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setOrdersDelivery: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    addOrderDelivery: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    updateOrderDelivery: (state, action: PayloadAction<Order>) => {
      const index = state.orders.findIndex(
        (ing) => ing.id == action.payload.id
      );
      state.orders[index] = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchOrdersDelivery.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
});

export const { updateOrderDelivery, setOrdersDelivery, addOrderDelivery } =
  OrderDeliverySlice.actions;

export default OrderDeliverySlice.reducer;
