import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectCPL,
  selectCPS,
  selectSeekAmount,
  selectTheme,
  setBoxSettings,
  setTheme,
  setVideoSettings,
} from "./settingsSlice";
import {
  FormControlLabel,
  Grid,
  Slider,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

export default function Settings() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const cps = useAppSelector(selectCPS);
  const cpl = useAppSelector(selectCPL);
  const seekAmount = useAppSelector(selectSeekAmount);
  const theme = useAppSelector(selectTheme);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <SettingsIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  sx={{ m: 1 }}
                  defaultChecked={theme}
                  onChange={(event, value) => dispatch(setTheme(value))}
                />
              }
              label="Theme"
            />

            <Typography gutterBottom>CPL: </Typography>
            <Slider
              sx={{ width: 300 }}
              defaultValue={cpl}
              onChange={(event, value) => {
                if (typeof value === "number")
                  dispatch(setBoxSettings({ cpl: value }));
              }}
              aria-label="Default"
              valueLabelDisplay="auto"
              step={1}
              min={15}
              max={45}
            />

            <Typography gutterBottom>CPS: </Typography>
            <Slider
              sx={{ width: 300 }}
              defaultValue={cps}
              onChange={(event, value) => {
                if (typeof value === "number")
                  dispatch(setBoxSettings({ cps: value }));
              }}
              aria-label="Default"
              valueLabelDisplay="auto"
              step={1}
              min={10}
              max={25}
            />

            <Typography gutterBottom>Seeking Amount: </Typography>
            <Slider
              sx={{ width: 300 }}
              defaultValue={seekAmount}
              onChange={(event, value) => {
                if (typeof value === "number")
                  dispatch(setVideoSettings({ seekAmount: value }));
              }}
              aria-label="Default"
              valueLabelDisplay="auto"
              step={10}
              min={20}
              max={1000}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
