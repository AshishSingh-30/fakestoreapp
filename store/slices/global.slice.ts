import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {
  isDarkMode: boolean;
}

const initialState: GlobalState = {
  isDarkMode: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsDarkMode(state, action: PayloadAction<boolean>) {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setIsDarkMode } = globalSlice.actions;
export default globalSlice.reducer;
