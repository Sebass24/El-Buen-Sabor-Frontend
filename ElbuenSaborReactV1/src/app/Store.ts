import IngredientCategorySlice from "@features/IngredientCategory/IngredientCategorySlice";
import IngredientSlice from "../features/Ingredients/IngredientsSlice";
import LoadingSlice from "../features/Loading/LoadingSlice";
import searchSlice from "../features/SearchProduct/Search";
import { configureStore } from "@reduxjs/toolkit";
import ProductCategorySlice from "@features/ProductCategory/ProductCategorySlice";
import ProductSlice from "@features/ProductSlice/ProductSlice";
import UserSlice from "@features/User/UserSlice";
import OrderSlice from "@features/Orders/OrderSlice";
import EmpleoyeesSlice from "@features/Empleoyees/empleoyeeSlice";
import ClientSlice from "@features/Clients/ClientSlice";
import cartProductsSlice from "@features/ShoppingCart/CartProducts";
import cartSlice from "@features/ShoppingCart/CartProducts";
import { loadState } from "./BrowserStorage";

export const Store = configureStore({
  reducer: {
    loading: LoadingSlice,
    ingredients: IngredientSlice,
    ingredintsCategories: IngredientCategorySlice,
    productCategories: ProductCategorySlice,
    product: ProductSlice,
    users: UserSlice,
    Order: OrderSlice,
    search: searchSlice,
    cart: cartSlice,
    empleoyees: EmpleoyeesSlice,
    clients: ClientSlice,
    cartProducts: cartProductsSlice
  },
  preloadedState: {
    cart: loadState("redux")?.cartSlice || []  // Only include the cartProducts slice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch;
