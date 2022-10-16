import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: { ms: number } = { ms: 0 };

export const videoSlice = createSlice({
  name: "video",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setVideoCurrentTime: (state, action: PayloadAction<number>) => {
      state.ms = action.payload * 1000;
    },
  },
});

export const { setVideoCurrentTime } = videoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectVideoCurrentTime = (state: RootState) => state.video.ms;

export default videoSlice.reducer;
