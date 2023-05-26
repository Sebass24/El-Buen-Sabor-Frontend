import Search from "@features/SearchProduct/Search";
import LoadingSlice from "../features/Loading/LoadingSlice";
import searchSlice from "../features/SearchProduct/Search";
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "@features/ShoppingCart/Cart";

export const Store = configureStore({
  reducer: { loading: LoadingSlice, search: searchSlice, cart: cartSlice },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch;
