import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state
const initialSearchState = {
    search: ''
};

// Define the slice using createSlice
const searchSlice = createSlice({
    name: 'search',
    initialState: initialSearchState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        }
    }
});

// Extract the reducer and actions from the slice
const { reducer, actions } = searchSlice;

// Export the actions
export const { setSearchValue } = actions;

// Create the Redux store using configureStore
export const store = configureStore({
    reducer: {
        search: reducer
    }
});

export interface AppState {
    search: string;
}

// Export the necessary types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;