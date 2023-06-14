import User from "@Models/Users/User";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "components/GenericFetch/GenericFetch";

export const fetchClients = createAsyncThunk("Clients/fetch", async () => {
  const data: User[] = await getData<User[]>("/api/user/Clients");
  return data
})