import OriginalTranscript from "./OriginalTranscript";
import WorkingTranslation from "./WorkingTranslation";

import "./subtitleSection.css";
import { Grid } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectVideoHeight } from "../videoPlayer/videoSlice";

function SubtitleSection(): JSX.Element {
  // To make it not have two scroll bars.
  // If I find I better method, I will remove this.
  const videoHeight = useAppSelector(selectVideoHeight);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      style={{ overflowY: "auto" }}
      sx={{
        height: { xs: `calc(100vh - ${videoHeight + 15}px)`, xl: "100vh" },
      }}
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
