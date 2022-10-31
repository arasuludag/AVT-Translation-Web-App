import OriginalTranscript from "./OriginalTranscript";
import WorkingTranslation from "./WorkingTranslation";

import "./subtitleSection.css";
import { Grid } from "@mui/material";

function SubtitleSection(): JSX.Element {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      className="subtitleContainer"
    >
      <Grid item sx={{ display: { xs: "none", sm: "block" } }}>
        <OriginalTranscript />
      </Grid>
      <Grid item>
        <WorkingTranslation />
      </Grid>
    </Grid>
  );
}

export default SubtitleSection;
