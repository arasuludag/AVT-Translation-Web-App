import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Seek {
  seconds: number;
  version: number;
}

export interface VideoState {
  seek: Seek;
}

const initialState: VideoState = {
  seek: {
    seconds: 0,
    version: 0,
  },
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideoTime: (state, action: PayloadAction<number>) => {
      state.seek.version++;
      state.seek.seconds = action.payload / 1000;
    },
  },
});

export const { setVideoTime } = videoSlice.actions;

export const selectVideoTime = (state: RootState) => state.video.seek;

export default videoSlice.reducer;
