import LoadingSlice from "../features/Loading/LoadingSlice";
import { configureStore } from "@reduxjs/toolkit";

export const Store = configureStore({
  reducer: { loading: LoadingSlice },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch;
