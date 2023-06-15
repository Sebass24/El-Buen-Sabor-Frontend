import User from "@Models/Users/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchClients } from "./ClientThunk";
// Define a type for the Loading state
interface FirsState {
  Clients: User[];
}

// Define the initial state using that type
const initialState: FirsState = {
  Clients: [],
};

export const EmpleoyeesSlice = createSlice({
  name: "Client",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setClients: (state, action: PayloadAction<User[]>) => {
      state.Clients = action.payload;
    },
    addClient: (state, action: PayloadAction<User>) => {
      state.Clients.push(action.payload)
    },
    updateClient: (state, action: PayloadAction<User>) => {
      const index = state.Clients.findIndex(ing => ing.id == action.payload.id)
      state.Clients[index] = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      state.Clients = action.payload
    })
  },
});

export const { setClients, addClient, updateClient } = EmpleoyeesSlice.actions;

export default EmpleoyeesSlice.reducer;
