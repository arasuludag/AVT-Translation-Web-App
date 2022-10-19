import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Settings {
  cpl: number;
  cps: number;
}

// Version is here to trigger state change.
const initialState: { settings: Settings } = {
  settings: { cpl: 30, cps: 17 },
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<Partial<Settings>>) => {
      console.log({ ...state.settings, ...action.payload });
      state.settings = { ...state.settings, ...action.payload };
    },
  },
});

export const { setSettings } = settingsSlice.actions;

export const selectCPS = (state: RootState) => state.settings.settings.cps;
export const selectCPL = (state: RootState) => state.settings.settings.cpl;

export default settingsSlice.reducer;
