import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface VideoState {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

const initialState: VideoState = {
  played: 0,
  playedSeconds: 0,
  loaded: 0,
  loadedSeconds: 0,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    videoProgress: (state, action: PayloadAction<VideoState>) => {
      state.played = action.payload.played;
      state.playedSeconds = action.payload.playedSeconds;
      state.loaded = action.payload.loaded;
      state.loadedSeconds = action.payload.loadedSeconds;
    },
  },
});

export const { videoProgress } = videoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectVideo = (state: RootState) => state.video;

export default videoSlice.reducer;
