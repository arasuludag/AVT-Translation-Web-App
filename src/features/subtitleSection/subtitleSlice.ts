import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Subtitle {
  id?: number;
  start_time: number;
  end_time: number;
  text: string;
  note: string;
  position: number;
}

export interface SubtitleFetch {
  data: Subtitle[];
  status: "idle" | "loading" | "failed";
}

const initialState: SubtitleFetch = {
  data: [],
  status: "idle",
};

export const subtitleSlice = createSlice({
  name: "subtitle",
  initialState,
  reducers: {
    insertToSubtitle: (state, action: PayloadAction<Subtitle>) => {
      const index = action.payload.id!;

      state.data[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubtitle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubtitle.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      })
      .addCase(fetchSubtitle.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const fetchSubtitle = createAsyncThunk(
  "subtitle/fetchSubtitle",
  async (subtitleID: string) => {
    const response = await fetch("/subtitleWorkingOn.json");

    return response.json();
  }
);

export const { insertToSubtitle } = subtitleSlice.actions;

export const selectSubtitles = (state: RootState) => state.subtitle.data;

export default subtitleSlice.reducer;
