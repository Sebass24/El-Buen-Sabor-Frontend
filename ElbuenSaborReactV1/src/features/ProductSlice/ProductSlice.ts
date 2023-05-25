import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./ProductThunk";
import Product from "@Models/Product/Product";
// Define a type for the Loading state
interface LoadingState {
  Products: Product[];
}

// Define the initial state using that type
const initialState: LoadingState = {
  Products: [],
};

export const ProductSlice = createSlice({
  name: "Product",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.Products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.Products.push(action.payload)
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.Products.findIndex(ing => ing.id == action.payload.id)
      state.Products[index] = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.Products = action.payload
    })
  },
});

export const { setProducts, addProduct, updateProduct } = ProductSlice.actions;

export default ProductSlice.reducer;
