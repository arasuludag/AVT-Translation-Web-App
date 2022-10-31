import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import VideoPlayer from "./features/videoPlayer/VideoPlayer";
import SubtitleSection from "./features/subtitleSection/SubtitleSection";
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@mui/material";
import { useAppSelector } from "./app/hooks";
import { selectTheme } from "./features/settings/settingsSlice";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFFFFF",
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#b8860b",
    },
  },
});

function App() {
  const theme = useAppSelector(selectTheme);

  return (
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={8} autoHideDuration={2000}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          className="App"
        >
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            xl
            sx={{ backgroundColor: "black" }}
          >
            <VideoPlayer />
          </Grid>
          <Grid item xs={12} md={12} lg={12} xl={7}>
            <SubtitleSection />
          </Grid>
        </Grid>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
