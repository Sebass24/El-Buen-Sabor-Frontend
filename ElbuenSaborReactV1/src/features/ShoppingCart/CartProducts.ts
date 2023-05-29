import OrderDetail from '@Models/orders/OrderDetail';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface CartProductsState {
    products: OrderDetail[];
}

// Define the initial state
const initialCartState: CartProductsState = {
    products: [],
};
// Define the slice using createSlice
export const cartProductsSlice = createSlice({
    name: 'products',
    initialState: initialCartState,
    reducers: {
        addProduct: (state, action: PayloadAction<OrderDetail>) => {
            const productToAdd = action.payload;
            const productInCartIndex = state.products.findIndex(item => item.product.id === productToAdd.product.id);
            if (productInCartIndex >= 0) {
                const updatedProducts = [...state.products];
                updatedProducts[productInCartIndex] = {
                    ...updatedProducts[productInCartIndex],
                    quantity: updatedProducts[productInCartIndex].quantity + productToAdd.quantity,
                };
                return {
                    ...state,
                    products: updatedProducts
                };
            } else {
                return {
                    ...state,
                    products: state.products.concat(productToAdd)
                }
            }
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            const idProductToDelete = action.payload;
            let updatedProducts = [...state.products];
            updatedProducts = state.products.filter(item => item.product.id !== idProductToDelete);
            return {
                ...state,
                products: updatedProducts
            };
        },
        modifyProductQuantity: (state, action: PayloadAction<OrderDetail>) => {
            const { product, quantity } = action.payload;
            const productToUpdateIndex = state.products.findIndex(item => item.product.id === product.id);
            if (productToUpdateIndex >= 0) {
                const updatedProducts = [...state.products];
                updatedProducts[productToUpdateIndex] = {
                    ...updatedProducts[productToUpdateIndex],
                    quantity: quantity,
                };
                return {
                    ...state,
                    products: updatedProducts,
                };
            }
            return state;
        },
    },
});

export const { addProduct, deleteProduct, modifyProductQuantity } = cartProductsSlice.actions;

export default cartProductsSlice.reducer;

