import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: { seconds: number } = { seconds: 0 };

export const videoSlice = createSlice({
  name: "video",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setVideoTime: (state, action: PayloadAction<number>) => {
      state.seconds = action.payload / 1000;
    },
  },
});

export const { setVideoTime } = videoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectVideoTime = (state: RootState) => state.video.seconds;

export default videoSlice.reducer;
