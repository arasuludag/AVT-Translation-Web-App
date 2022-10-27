import Grid from "@mui/material/Grid";

import OriginalTranscript from "./OriginalTranscript";
import WorkingTranslation from "./WorkingTranslation";

import "./subtitleSection.css";

function SubtitleSection() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      style={{ overflowY: "auto", height: "100vh" }}
      spacing={2}
    >
      <Grid item md style={{ margin: "20px 20px" }}>
        <OriginalTranscript />
      </Grid>
      <Grid item md style={{ margin: "20px 20px" }}>
        <WorkingTranslation />
      </Grid>
    </Grid>
  );
}

export default SubtitleSection;
