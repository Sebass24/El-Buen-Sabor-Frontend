import User from "types/Users/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchEmpleoyees } from "./EmpleoyeesThunk";
// Define a type for the Loading state
interface FirsState {
  Empleoyees: User[];
}

// Define the initial state using that type
const initialState: FirsState = {
  Empleoyees: [],
};

export const EmpleoyeesSlice = createSlice({
  name: "Empleoyee",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setEmpleoyees: (state, action: PayloadAction<User[]>) => {
      state.Empleoyees = action.payload;
    },
    addEmpleoyee: (state, action: PayloadAction<User>) => {
      state.Empleoyees.push(action.payload)
    },
    updateEmpleoyee: (state, action: PayloadAction<User>) => {
      const index = state.Empleoyees.findIndex(ing => ing.id == action.payload.id)
      state.Empleoyees[index] = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchEmpleoyees.fulfilled, (state, action) => {
      state.Empleoyees = action.payload
    })
  },
});

export const { setEmpleoyees, addEmpleoyee, updateEmpleoyee } = EmpleoyeesSlice.actions;

export default EmpleoyeesSlice.reducer;
