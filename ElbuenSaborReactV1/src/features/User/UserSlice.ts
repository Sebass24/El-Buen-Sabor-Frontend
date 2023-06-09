import Address from "types/Users/Address";
import Phone from "types/Users/Phone";
import Role from "types/Users/Role";
import User from "types/Users/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchAddresses, fetchPhones } from "./UserThunk";

// Define a type for the Loading state
interface LoadingState {
  token: string,
  userStoredInDB: boolean,
  user: {
    id: number,
    auth0Id: string;
    lastName: string;
    name: string;
    userEmail: string;
    role: Role;
    addresses: Address[];
    phones: Phone[];
  }
}

// Define the initial state using that type
const initialState: LoadingState = {
  token: "",
  userStoredInDB: false,
  user: {
    id: 0,
    auth0Id: "",
    lastName: "",
    name: "",
    userEmail: "",
    role: null as any,
    addresses: [],
    phones: [],
  }
};

export const UserSlice = createSlice({
  name: "User",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUserData: (state, action: PayloadAction<User>) => {
      const { id, name, lastName, userEmail, auth0Id } = action.payload;
      state.user.id = id as number;
      state.user.auth0Id = auth0Id as string;
      state.user.name = name as string;
      state.user.lastName = lastName as string;
      state.user.userEmail = userEmail as string;
    },
    resetUserData: (state) => {
      state.user = initialState.user;
      state.userStoredInDB = false;
    },
    setStoredInDB: (state, action: PayloadAction<boolean>) => {
      state.userStoredInDB = action.payload;
    },
    setUserId: (state, action: PayloadAction<number>) => {
      state.user.id = action.payload;
    },
    setUserRole: (state, action: PayloadAction<Role>) => {
      state.user.role = action.payload;
    },
    deleteUserAddress: (state, action: PayloadAction<Address>) => {
      state.user.addresses = state.user.addresses.filter((a) => a.id !== action.payload.id);
    },
    deleteUserPhone: (state, action: PayloadAction<Phone>) => {
      state.user.phones = state.user.phones.filter((p) => p.id !== action.payload.id);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.user.addresses = action.payload
      })
      .addCase(fetchPhones.fulfilled, (state, action) => {
        state.user.phones = action.payload
      });
  },
});

export const { setUserToken, resetUserData, setUserData, setStoredInDB, setUserId, setUserRole, deleteUserAddress, deleteUserPhone } = UserSlice.actions;

export default UserSlice.reducer;
