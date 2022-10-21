import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import "./App.css";

import VideoPlayer from "./features/videoPlayer/VideoPlayer";
import SubtitleSection from "./features/subtitleSection/SubtitleSection";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFFFFF",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        className="App"
      >
        <Grid item xs={12} lg={12} xl={5}>
          <VideoPlayer />
        </Grid>
        <Grid item xs={12} lg={12} xl={7}>
          <SubtitleSection />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
