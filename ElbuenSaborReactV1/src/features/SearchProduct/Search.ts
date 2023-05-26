import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
    search: string;
}

// Define the initial state
const initialSearchState = {
    search: ''
};

// Define the slice using createSlice
export const searchSlice = createSlice({
    name: 'search',
    initialState: initialSearchState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        }
    }
});

export const { setSearchValue } = searchSlice.actions;

export default searchSlice.reducer;

