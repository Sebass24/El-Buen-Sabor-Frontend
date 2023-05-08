import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/Store";

// Define a type for the Loading state
interface LoadingState {
  value: boolean;
}

// Define the initial state using that type
const initialState: LoadingState = {
  value: false,
};

export const counterSlice = createSlice({
  name: "loading",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    startLoading: (state) => {
      state.value = true;
    },
    finishLoading: (state) => {
      state.value = false;
    },
  },
});

export const { startLoading, finishLoading } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
