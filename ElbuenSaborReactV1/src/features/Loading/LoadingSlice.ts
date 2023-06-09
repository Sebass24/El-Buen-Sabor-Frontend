import { createSlice } from "@reduxjs/toolkit";
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

export default counterSlice.reducer;
