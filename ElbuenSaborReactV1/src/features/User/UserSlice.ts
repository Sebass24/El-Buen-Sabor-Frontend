import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Product from "@Models/Product/Product";
// Define a type for the Loading state
interface LoadingState {
  token: string
}

// Define the initial state using that type
const initialState: LoadingState = {
  token: "",
};

export const UserSlice = createSlice({
  name: "User",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },

});

export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;
