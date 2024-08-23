import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertColor } from "@mui/material";

export interface AlertState {
  severity: AlertColor;
  text: string;
}

const initialState: AlertState = {
  severity: "error",
  text: "",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert(
      state,
      action: PayloadAction<{ severity: AlertColor; text: string }>
    ) {
      state.severity = action.payload.severity;
      state.text = action.payload.text;
    },
    hideAlert(state) {
      state.severity = "error";
      state.text = "";
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
