import Order from '@Models/Orders/Order';
import OrderDetail from '@Models/Orders/OrderDetail';
import Address from '@Models/Users/Address';
import User from '@Models/Users/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface cartOrderSlice {
    order: Order;
}

interface addressPhone {
    address: Address;
    phone: string;
}

// Define the initial state
const initialCartState: cartOrderSlice = {
    order: {
        id: null as any,
        deleted: false,
        deliveryMethod: "",
        date: "",
        orderStatus: "A confirmar",
        estimatedTime: null as any,
        paymentMethod: "",
        paid: false,
        user: null as any,
        orderDetails: [],
        total: 0,
        discount: 0,
        address: null as any,
        phone: ""
    }
};

// Define the slice using createSlice
export const cartOrderSlice = createSlice({
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
        setDeliveryMethod: (state, action: PayloadAction<string>) => {
            state.order.deliveryMethod = action.payload;
            state.order.paymentMethod = "";
            if (state.order.deliveryMethod === "Retiro en el local") {
                state.order.discount = state.order.total * 0.1;
            } else if (state.order.deliveryMethod === "Envío a domicilio") {
                state.order.discount = 0;
            }
        },
        setPaymentMethod: (state, action: PayloadAction<string>) => {
            state.order.paymentMethod = action.payload;
        },
        setAddressPhone: (state, action: PayloadAction<addressPhone>) => {
            const { address, phone } = action.payload;
            state.order.address = address;
            state.order.phone = phone;
        },
        setTotalPrice: (state) => {
            state.order.total = state.order.orderDetails.reduce((total, item) => total + (item.product.sellPrice as number * item.quantity), 0);
        },
        setCartUser: (state, action: PayloadAction<User>) => {
            state.order.user = action.payload;
        },
        setCartDate: (state, action: PayloadAction<string>) => {
            state.order.date = action.payload;
        }
    },
});

export const { addProduct, deleteProduct, modifyProductQuantity, setDeliveryMethod, setPaymentMethod, setAddressPhone, setTotalPrice, setCartUser, setCartDate } = cartOrderSlice.actions;

export default cartOrderSlice.reducer;

