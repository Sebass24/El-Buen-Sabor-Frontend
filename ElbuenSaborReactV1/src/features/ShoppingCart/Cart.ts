import Order from '@Models/Orders/Order';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

let or: Order = {
    deliveryMethod: {
        description: '',
        id: 0,
        deleted: false
    },
    orderStatus: {
        description: '',
        id: 0,
        deleted: false
    },
    paymentMethod: {
        description: '',
        id: 0,
        deleted: false
    },
    paid: false,
    user: {
        lastName: '',
        name: '',
        password: '',
        userEmail: '',
        role: {
            description: '',
            id: 0,
            deleted: false
        },
        addresses: [],
        phones: [],
        id: 0,
        deleted: false
    },
    orderDetails: [],
    total: 0,
    discount: 0,
    id: 0,
    deleted: false
}
export interface CartState {
    order: Order | null;
}

// Define the initial state
const initialCartState = {
    order: null
};

// Define the slice using createSlice
export const cartSlice = createSlice({
    name: 'order',
    initialState: initialCartState,
    reducers: {
       /*  setOrder: (state, action: PayloadAction<Partial<Order>>) => {
            state.order = { ...action.payload };
        },
        deleteProduct: (state, action: PayloadAction<Partial<Order>>) => {
            state.order = { ...state.order, ...action.payload };
        },
        modifyOrder: (state, action: PayloadAction<Partial<Order>>) => {
            state.order = { ...state.order, ...action.payload };
        } */
    }
});

/* export const { addProduct, deleteProduct, modifyProductQuantity } = cartSlice.actions; */

export default cartSlice.reducer;

