import { createAsyncThunk } from "@reduxjs/toolkit";
import Address from "@Models/Users/Address";
import Phone from "@Models/Users/Phone";
import { getAddressesByUserId, getPhonesByUserId } from "@services/users";

export const fetchAddresses = createAsyncThunk<Address[], number>(
    "addresses/fetch",
    async (userId: number, { rejectWithValue }) => {
        try {
            const data: Address[] = await getAddressesByUserId(userId);
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue("Failed to fetch addresses");
        }
    }
);

export const fetchPhones = createAsyncThunk<Phone[], number>(
    "phones/fetch",
    async (userId: number, { rejectWithValue }) => {
        try {
            const data: Phone[] = await getPhonesByUserId(userId);
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue("Failed to fetch phones");
        }
    })