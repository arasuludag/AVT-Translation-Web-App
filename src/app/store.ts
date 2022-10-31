import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import videoReducer from "../features/videoPlayer/videoSlice";
import subtitleReducer from "../features/subtitleSection/subtitleSlice";
import settingsReducer from "../features/settings/settingsSlice";

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