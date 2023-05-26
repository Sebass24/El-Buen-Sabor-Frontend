import ProductCategory from "@Models/Product/ProductCategory";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchProductCategory } from "./ProductCategoryThunk";
// Define a type for the Loading state
interface FirsState {
  ProductCategory: ProductCategory[];
}

// Define the initial state using that type
const initialState: FirsState = {
  ProductCategory: [],
};

export const IngredientCategorySlice = createSlice({
  name: "IngredientsCategory",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setProductCategory: (state, action: PayloadAction<ProductCategory[]>) => {
      state.ProductCategory = action.payload;
    },
    addProductCategory: (state, action: PayloadAction<ProductCategory>) => {
      state.ProductCategory.push(action.payload)
    },
    updateProductCategory: (state, action: PayloadAction<ProductCategory>) => {
      const index = state.ProductCategory.findIndex(ing => ing.id == action.payload.id)
      state.ProductCategory[index] = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchProductCategory.fulfilled, (state, action) => {
      state.ProductCategory = action.payload
    })
  },
});

export const { setProductCategory, addProductCategory, updateProductCategory } = IngredientCategorySlice.actions;

export default IngredientCategorySlice.reducer;
