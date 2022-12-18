import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import videoReducer from "../slices/videoSlice";
import subtitleReducer from "../slices/subtitleSlice";
import settingsReducer from "../slices/settingsSlice";

export const store = configureStore({
  reducer: {
    video: videoReducer,
    subtitle: subtitleReducer,
    settings: settingsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
