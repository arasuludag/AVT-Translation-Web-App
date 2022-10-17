import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import "./App.css";

import VideoPlayer from "./features/videoPlayer/VideoPlayer";
import SubtitleSection from "./features/subtitleSection/SubtitleSection";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
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
        <Grid item md={12} lg={5}>
          <VideoPlayer />
        </Grid>
        <Grid item md={12} lg={7}>
          <SubtitleSection />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
