import Address from "@Models/Users/Address";
import Phone from "@Models/Users/Phone";
import User from "@Models/Users/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define a type for the Loading state
interface LoadingState {
  token: string,
  userStoredInDB: boolean,
  user: {
    auth0Id: string;
    lastName: string;
    name: string;
    userEmail: string;
    addresses: Address[];
    phones: Phone[];
  }
}

interface Auth0Data {
  auth0Id: string,
  lastName: string,
  name: string,
  email: string
}

// Define the initial state using that type
const initialState: LoadingState = {
  token: "",
  userStoredInDB: false,
  user: {
    auth0Id: "",
    lastName: "",
    name: "",
    userEmail: "",
    addresses: null as any,
    phones: null as any
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
    setUserAuth0Data: (state, action: PayloadAction<Auth0Data>) => {
      const { name, lastName, email, auth0Id } = action.payload;
      state.user.auth0Id = auth0Id;
      state.user.name = name;
      state.user.lastName = lastName;
      state.user.userEmail = email;
    },
    setUserData: (state, action: PayloadAction<User>) => {
      const { name, lastName, userEmail, auth0Id } = action.payload;
      state.user.auth0Id = auth0Id;
      state.user.name = name;
      state.user.lastName = lastName;
      state.user.userEmail = userEmail;
    },
    resetUserData: (state) => {
      state.user.addresses = null as any;
      state.user.auth0Id = "";
      state.user.lastName = "";
      state.user.name = "";
      state.user.phones = null as any;
      state.user.userEmail = "";
    },
    setStoredInDB: (state, action: PayloadAction<boolean>) => {
      state.userStoredInDB = action.payload;
    }
  },
});

export const { setUserToken, setUserAuth0Data, resetUserData, setUserData, setStoredInDB } = UserSlice.actions;

export default UserSlice.reducer;
