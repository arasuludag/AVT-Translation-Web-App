import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface BoxSettings {
  cpl: number;
  cps: number;
}

export interface VideoSettings {
  seekAmount: number;
}

export interface ThemeSettings {
  isDark: boolean;
}

export interface Settings {
  boxSettings: BoxSettings;
  videoSettings: VideoSettings;
  themeSettings: ThemeSettings;
}

// Version is here to trigger state change.
const initialState: Settings = {
  boxSettings: { cpl: 30, cps: 17 },
  videoSettings: { seekAmount: 40 },
  themeSettings: { isDark: true },
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setBoxSettings: (state, action: PayloadAction<Partial<BoxSettings>>) => {
      state.boxSettings = { ...state.boxSettings, ...action.payload };
    },
    setVideoSettings: (
      state,
      action: PayloadAction<Partial<VideoSettings>>
    ) => {
      state.videoSettings = { ...state.videoSettings, ...action.payload };
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.themeSettings = { isDark: action.payload };
    },
  },
});

export const { setBoxSettings, setVideoSettings, setTheme } =
  settingsSlice.actions;

export const selectCPS = (state: RootState) => state.settings.boxSettings.cps;
export const selectCPL = (state: RootState) => state.settings.boxSettings.cpl;
export const selectTheme = (state: RootState) =>
  state.settings.themeSettings.isDark;
export const selectSeekAmount = (state: RootState) =>
  state.settings.videoSettings.seekAmount;

export default settingsSlice.reducer;
