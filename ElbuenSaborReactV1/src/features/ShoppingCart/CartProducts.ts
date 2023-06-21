import DeliveryMethod from 'types/Orders/DeliveryMethod';
import OrderDetail from 'types/Orders/OrderDetail';
import PaymentMethod from 'types/Orders/PaymentMethod';
import User from 'types/Users/User';
import Order from '../../types/Orders/Order';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface cartSlice {
  order: Order;
}

// Define the initial state
const initialCartState: cartSlice = {
  order: {
    id: null as any,
    deleted: false,
    deliveryMethod: { id: 0, description: "none" },
    date: "",
    orderStatus: { id: 1, description: "A confirmar" },
    estimatedTime: null as any,
    paymentMethod: { id: 0, description: "none" },
    paid: false,
    user: null as any,
    orderDetails: [],
    total: 0,
    discount: 0,
    address: "",
    phone: ""
  }
};

// Define the slice using createSlice
export const cartSlice = createSlice({
  name: 'order',
  initialState: initialCartState,
  reducers: {
    addProduct: (state, action: PayloadAction<OrderDetail>) => {
      const productToAdd = action.payload;
      const productInCartIndex = state.order.orderDetails.findIndex(item => item.product.id === productToAdd.product.id);
      if (productInCartIndex >= 0) {
        const updatedproducts = [...state.order.orderDetails];
        updatedproducts[productInCartIndex] = {
          ...updatedproducts[productInCartIndex],
          quantity: updatedproducts[productInCartIndex].quantity + productToAdd.quantity,
        };
        state.order.orderDetails = updatedproducts;
      } else {
        state.order.orderDetails.push(productToAdd)
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      const idProductToDelete = action.payload;
      let updatedproducts = [...state.order.orderDetails];
      updatedproducts = state.order.orderDetails.filter(item => item.product.id !== idProductToDelete);
      state.order.orderDetails = updatedproducts;
    },
    modifyProductQuantity: (state, action: PayloadAction<OrderDetail>) => {
      const { product, quantity } = action.payload;
      const productToUpdateIndex = state.order.orderDetails.findIndex(item => item.product.id === product.id);
      if (productToUpdateIndex >= 0) {
        const updatedproducts = [...state.order.orderDetails];
        updatedproducts[productToUpdateIndex] = {
          ...updatedproducts[productToUpdateIndex],
          quantity: quantity,
        };
        state.order.orderDetails = updatedproducts;
      }
      return state;
    },
    setDeliveryMethod: (state, action: PayloadAction<DeliveryMethod>) => {
      state.order.deliveryMethod = action.payload;
      state.order.paymentMethod = { id: 0, description: "" };
      if (state.order.deliveryMethod.id === 2) {
        state.order.discount = state.order.total * 0.1;
      } else if (state.order.deliveryMethod.id === 1) {
        state.order.discount = 0;
      }
    },
    setPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.order.paymentMethod = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.order.address = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.order.phone = action.payload;
    },
    setTotalPrice: (state) => {
      state.order.total = state.order.orderDetails.reduce((total, item) => total + (item.product.sellPrice as number * item.quantity), 0);
    },
    setCartUser: (state, action: PayloadAction<User>) => {
      state.order.user = action.payload;
      state.order.orderStatus = { id: 1, description: "A confirmar" };
    },

    resetOrderDetails: (state) => {
      state.order.deliveryMethod = { id: 0, description: "none" };
      state.order.date = "";
      state.order.paymentMethod = { id: 0, description: "none" };
      state.order.orderDetails = [];
      state.order.total = 0;
      state.order.discount = 0;
      state.order.address = "";
      state.order.phone = "";
    }
  },
});

export const { addProduct, deleteProduct, modifyProductQuantity, setDeliveryMethod, setPaymentMethod, setAddress, setPhone, setTotalPrice, setCartUser, resetOrderDetails } = cartSlice.actions;

export default cartSlice.reducer;

