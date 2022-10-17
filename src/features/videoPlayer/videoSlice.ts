import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

// Version is here to trigger state change.
const initialState: { seconds: number; version: number } = {
  seconds: 0,
  version: 0,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideoTime: (state, action: PayloadAction<number>) => {
      state.version++;
      state.seconds = action.payload / 1000;
    },
  },
});

export const { setVideoTime } = videoSlice.actions;

export const selectVideoTime = (state: RootState) => state.video;

export default videoSlice.reducer;
