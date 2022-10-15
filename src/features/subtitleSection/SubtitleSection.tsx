import Grid from "@mui/material/Grid";

import OriginalTranscript from "./OriginalTranscript";
import WorkingTranslation from "./WorkingTranslation";

function SubtitleSection() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      style={{ overflowY: "scroll", height: "100vh" }}
    >
      <Grid item md={6}>
        <OriginalTranscript />
      </Grid>
      <Grid item md={6}>
        <WorkingTranslation />
      </Grid>
    </Grid>
  );
}

export default SubtitleSection;
