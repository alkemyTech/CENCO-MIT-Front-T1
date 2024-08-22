import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConfirmationStatus {
    open: boolean;
    status: boolean;
}

const initialState: ConfirmationStatus = {
    open: false,
    status: false
};

const confirmationSlice = createSlice({
    name: "confirmation",
    initialState,
    reducers: {
        showConfirmation(state) {
            state.open = true;
        },
        hideConfirmation(state) {
            state.open = false;
        },
        setConfirmationStatus(state, action: PayloadAction<boolean>) {
            state.status = action.payload;
        }
    },
});

export const { showConfirmation, hideConfirmation, setConfirmationStatus } = confirmationSlice.actions;
export default confirmationSlice.reducer;
