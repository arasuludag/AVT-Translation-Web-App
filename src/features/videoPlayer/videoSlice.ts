import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Seek {
  seconds: number;
  version: number;
}

export interface VideoState {
  seek: Seek;
  videoHeight: number;
}

const initialState: VideoState = {
  seek: {
    seconds: 0,
    version: 0,
  },
  videoHeight: 0,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideoTime: (state, action: PayloadAction<number>) => {
      state.seek.version++;
      state.seek.seconds = action.payload / 1000;
    },
    setVideoHeight: (state, action: PayloadAction<number>) => {
      state.videoHeight = action.payload;
    },
  },
});

export const { setVideoTime, setVideoHeight } = videoSlice.actions;

export const selectVideoTime = (state: RootState) => state.video.seek;
export const selectVideoHeight = (state: RootState) => state.video.videoHeight;

export default videoSlice.reducer;
