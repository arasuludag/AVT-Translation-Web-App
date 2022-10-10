import React from "react";
import Grid from "@mui/material/Grid";

import OriginalTranscript from "./OriginalTranscript";

function SubtitleSection() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      style={{ overflowY: "scroll", height: "100vh" }}
    >
      <Grid item md={5}>
        <OriginalTranscript />
      </Grid>
      <Grid item md={5}>
        working on it
      </Grid>
      <Grid item md={2}>
        audio visualize
      </Grid>
    </Grid>
  );
}

export default SubtitleSection;
