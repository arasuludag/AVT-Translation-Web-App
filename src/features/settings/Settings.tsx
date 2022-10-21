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
  setBoxSettings,
  setVideoSettings,
} from "./settingsSlice";
import { Grid, Slider, Typography } from "@mui/material";

export default function Settings() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const cps = useAppSelector(selectCPS);
  const cpl = useAppSelector(selectCPL);
  const seekAmount = useAppSelector(selectSeekAmount);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button sx={{ color: "white" }} onClick={handleClickOpen}>
        <SettingsIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{"Settings"}</DialogTitle>
        <DialogContent sx={{ height: "250px", overflowX: "hidden" }}>
          <Grid container>
            <Grid
              item
              container
              xs
              sx={{ width: 450, height: 100 }}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography gutterBottom>Chracter per Line: </Typography>
              <Slider
                sx={{ width: 300 }}
                defaultValue={cpl}
                onChange={(event, value) => {
                  if (typeof value === "number")
                    dispatch(setBoxSettings({ cpl: value }));
                }}
                aria-label="Default"
                valueLabelDisplay="on"
                step={1}
                min={15}
                max={45}
              />
            </Grid>
            <Grid
              item
              container
              xs
              sx={{ width: 450, height: 100 }}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography gutterBottom>Chracter per Second: </Typography>
              <Slider
                sx={{ width: 300 }}
                defaultValue={cps}
                onChange={(event, value) => {
                  if (typeof value === "number")
                    dispatch(setBoxSettings({ cps: value }));
                }}
                aria-label="Default"
                valueLabelDisplay="on"
                step={1}
                min={10}
                max={25}
              />
              <Grid
                item
                container
                xs
                sx={{ width: 450, height: 100 }}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography gutterBottom>Forward / Reverse Amount: </Typography>
                <Slider
                  sx={{ width: 300 }}
                  defaultValue={seekAmount}
                  onChange={(event, value) => {
                    if (typeof value === "number")
                      dispatch(setVideoSettings({ seekAmount: value }));
                  }}
                  aria-label="Default"
                  valueLabelDisplay="on"
                  step={10}
                  min={20}
                  max={1000}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
