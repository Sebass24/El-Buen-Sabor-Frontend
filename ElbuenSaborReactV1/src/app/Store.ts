import IngredientCategorySlice from "@features/IngredientCategory/IngredientCategorySlice";
import IngredientSlice from "../features/Ingredients/IngredientsSlice";
import LoadingSlice from "../features/Loading/LoadingSlice";
import searchSlice from "../features/SearchProduct/Search";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import ProductCategorySlice from "@features/ProductCategory/ProductCategorySlice";
import ProductSlice from "@features/ProductSlice/ProductSlice";
import UserSlice from "@features/User/UserSlice";
import OrderSlice from "@features/Orders/OrderSlice";
import EmpleoyeesSlice from "@features/Empleoyees/empleoyeeSlice";
import ClientSlice from "@features/Clients/ClientSlice";
import { loadState } from "./BrowserStorage";
import cartSlice from "@features/ShoppingCart/CartProducts";
import { saveState } from "./BrowserStorage";
import OrderCookSlice from "@features/OrderCook/OrderCookSlice";
import OrderDeliverySlice from "@features/OrderDelivery/OrderDelivery";

const saveCartToLocalStorage = () => (next: any) => (action: any) => {
  const result = next(action);
  saveState("cartProducts", Store.getState().cart);
  return result;
};

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
    orderCook: OrderCookSlice,
    orderDelivery: OrderDeliverySlice,
  },
  preloadedState: {
    cart: loadState("cartProducts"),
  },
  middleware: [...getDefaultMiddleware(), saveCartToLocalStorage],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch;
