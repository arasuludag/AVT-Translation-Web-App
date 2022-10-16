import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Subtitle {
  id: number;
  start_time: number;
  end_time: number;
  text: string;
  note: string;
  position: number;
}

export interface SubtitleFetch {
  transcriptData: Subtitle[];
  workingOndata: Subtitle[];
  activeSubtitle: number;
  subtitleToDisplay: "original" | "workingOn";
  status: "idle" | "loading" | "failed";
}

const initialState: SubtitleFetch = {
  transcriptData: [],
  workingOndata: [],
  activeSubtitle: -1,
  subtitleToDisplay: "original",
  status: "idle",
};

export const subtitleSlice = createSlice({
  name: "subtitle",
  initialState,
  reducers: {
    insertToSubtitle: (
      state,
      action: PayloadAction<{ subtitle: Partial<Subtitle>; index: number }>
    ) => {
      state.workingOndata[action.payload.index] = {
        ...state.workingOndata[action.payload.index],
        ...action.payload.subtitle,
      };
    },
    insertBox: (
      state,
      action: PayloadAction<{
        id: number;
        end_time: number;
        indexToInsert: number;
      }>
    ) => {
      const index = action.payload.indexToInsert;

      state.workingOndata.splice(index, 0, {
        id: action.payload.id,
        start_time: action.payload.end_time,
        end_time: action.payload.end_time,
        text: "",
        note: "",
        position: 1,
      });
    },
    setActiveSubtitle: (state, action: PayloadAction<number>) => {
      let subtitles: Subtitle[];

      if (state.subtitleToDisplay === "original")
        subtitles = state.transcriptData;
      else subtitles = state.workingOndata;

      state.activeSubtitle = subtitles.findIndex(
        (subtitle) =>
          subtitle.start_time <= action.payload &&
          subtitle.end_time > action.payload
      );
    },
    setSubtitleToDisplay: (
      state,
      action: PayloadAction<"original" | "workingOn">
    ) => {
      state.subtitleToDisplay = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubtitle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubtitle.fulfilled, (state, action) => {
        state.status = "idle";
        state.workingOndata = action.payload;
      })
      .addCase(fetchSubtitle.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchOriginalTranscript.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOriginalTranscript.fulfilled, (state, action) => {
        state.status = "idle";
        state.transcriptData = action.payload;
      })
      .addCase(fetchOriginalTranscript.rejected, (state) => {
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

export const fetchOriginalTranscript = createAsyncThunk(
  "subtitle/fetchOriginalTranscript",
  async (subtitleID: string) => {
    const response = await fetch("/subtitle.json");

    return response.json();
  }
);

export const {
  insertToSubtitle,
  insertBox,
  setActiveSubtitle,
  setSubtitleToDisplay,
} = subtitleSlice.actions;

export const selectSubtitles = (state: RootState) =>
  state.subtitle.workingOndata;
export const selectTranscript = (state: RootState) =>
  state.subtitle.transcriptData;
export const selectWhichSubToShow = (state: RootState) =>
  state.subtitle.subtitleToDisplay;
export const selectActiveSubtitle = (state: RootState) =>
  state.subtitle.activeSubtitle;

export default subtitleSlice.reducer;
