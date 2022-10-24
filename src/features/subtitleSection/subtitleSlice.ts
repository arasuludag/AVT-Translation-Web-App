import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import Transcript from "./subtitle.json";
import WorkingOnSubtitle from "./subtitleWorkingOn.json";

export interface Subtitle {
  id?: number;
  start_time: number;
  end_time: number;
  text: string;
  note: string;
  position: number;
}

export interface SubtitleFetch {
  transcriptData: Subtitle[];
  workingOndata: Subtitle[];
  subtitleToDisplay: { whichOne: "original" | "workingOn"; index: number };
  nextFreeID: number;
  transcriptStatus: "idle" | "loading" | "failed";
  workingOnSubtitleStatus: "idle" | "loading" | "failed";
}

const initialState: SubtitleFetch = {
  transcriptData: [],
  workingOndata: [],
  subtitleToDisplay: { whichOne: "original", index: -1 },
  nextFreeID: 0,
  transcriptStatus: "idle",
  workingOnSubtitleStatus: "idle",
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
        end_time: number;
        indexToInsert: number;
      }>
    ) => {
      const index = action.payload.indexToInsert;

      state.workingOndata.splice(index, 0, {
        id: state.nextFreeID,
        start_time: action.payload.end_time,
        end_time: action.payload.end_time,
        text: "",
        note: "",
        position: 1,
      });

      state.nextFreeID++;
    },
    deleteBox: (state, action: PayloadAction<number>) => {
      const index = state.workingOndata.findIndex(
        (subtitle) => subtitle.id === action.payload
      );
      state.workingOndata.splice(index, 1);
    },
    setActiveSubtitle: (state, action: PayloadAction<number>) => {
      let subtitles: Subtitle[];

      if (state.subtitleToDisplay.whichOne === "original")
        subtitles = state.transcriptData;
      else subtitles = state.workingOndata;

      state.subtitleToDisplay.index = subtitles.findIndex(
        (subtitle) =>
          subtitle.start_time <= action.payload &&
          subtitle.end_time > action.payload
      );
    },
    setSubtitleToDisplay: (
      state,
      action: PayloadAction<"original" | "workingOn">
    ) => {
      state.subtitleToDisplay.whichOne = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubtitle.pending, (state) => {
        state.workingOnSubtitleStatus = "loading";
      })
      .addCase(fetchSubtitle.fulfilled, (state, action) => {
        state.workingOnSubtitleStatus = "idle";
        state.nextFreeID = action.payload.length;
        const subtitle = action.payload.map((subtitle: Subtitle, index) => {
          return { ...subtitle, id: index };
        });
        state.workingOndata = subtitle;
      })
      .addCase(fetchSubtitle.rejected, (state) => {
        state.workingOnSubtitleStatus = "failed";
      })
      .addCase(fetchOriginalTranscript.pending, (state) => {
        state.transcriptStatus = "loading";
      })
      .addCase(fetchOriginalTranscript.fulfilled, (state, action) => {
        state.transcriptStatus = "idle";
        const subtitle = action.payload.map((subtitle: Subtitle, index) => {
          return { ...subtitle, id: index };
        });
        state.transcriptData = subtitle;
      })
      .addCase(fetchOriginalTranscript.rejected, (state) => {
        state.transcriptStatus = "failed";
      });
  },
});

export const fetchSubtitle = createAsyncThunk(
  "subtitle/fetchSubtitle",
  async (subtitleID: string) => {
    // When connected to the backend.
    // const response = await fetch("");

    return WorkingOnSubtitle;
  }
);

export const fetchOriginalTranscript = createAsyncThunk(
  "subtitle/fetchOriginalTranscript",
  async (subtitleID: string) => {
    // When connected to the backend.
    // const response = await fetch("");

    return Transcript;
  }
);

export const {
  insertToSubtitle,
  insertBox,
  setActiveSubtitle,
  setSubtitleToDisplay,
  deleteBox,
} = subtitleSlice.actions;

export const selectSubtitles = (state: RootState) =>
  state.subtitle.workingOndata;
export const selectTranscript = (state: RootState) =>
  state.subtitle.transcriptData;
export const selectActiveSubtitle = (state: RootState) =>
  state.subtitle.subtitleToDisplay;

export default subtitleSlice.reducer;
