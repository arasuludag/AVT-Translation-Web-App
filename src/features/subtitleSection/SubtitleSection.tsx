import Grid from "@mui/material/Grid";

import OriginalTranscript from "./OriginalTranscript";
import WorkingTranslation from "./WorkingTranslation";

import "./subtitleSection.css";

function SubtitleSection() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      style={{ overflowY: "auto", height: "100vh" }}
    >
      <Grid item style={{ margin: "20px 20px" }}>
        <OriginalTranscript />
      </Grid>
      <Grid item style={{ margin: "20px 20px" }}>
        <WorkingTranslation />
      </Grid>
    </Grid>
  );
}

export default SubtitleSection;
