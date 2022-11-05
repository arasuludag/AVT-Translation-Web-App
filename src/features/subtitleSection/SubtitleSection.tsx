import "./subtitleSection.css";
import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchOriginalTranscript,
  fetchSubtitle,
  selectSubtitles,
  selectTranscript,
} from "./subtitleSlice";
import { useEffect } from "react";

import SubtitleBoxesRow from "./SubtitleBoxesRow";

function SubtitleSection(): JSX.Element {
  const dispatch = useAppDispatch();

  const transcriptSubtitles = useAppSelector(selectTranscript);
  const subtitles = useAppSelector(selectSubtitles);

  useEffect(() => {
    // ID will be sent when connected to the backend.
    dispatch(fetchOriginalTranscript(""));
    dispatch(fetchSubtitle(""));
  }, [dispatch]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      className="subtitleContainer"
    >
      <Grid item sx={{ display: { xs: "none", sm: "block" } }}>
        <SubtitleBoxesRow subtitles={transcriptSubtitles} readOnly={true} />
      </Grid>
      <Grid item>
        <SubtitleBoxesRow subtitles={subtitles} readOnly={false} />
      </Grid>
    </Grid>
  );
}

export default SubtitleSection;
