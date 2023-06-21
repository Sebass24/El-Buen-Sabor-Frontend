import User from "types/Users/User";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "components/GenericFetch/GenericFetch";

export const fetchEmpleoyees = createAsyncThunk("Empleoyees/fetch", async () => {
  const data: User[] = await getData<User[]>("/api/user/Empleoyees");
  return data
})