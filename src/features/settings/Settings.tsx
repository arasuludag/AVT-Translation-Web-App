import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCPL, selectCPS, setSettings } from "./settingsSlice";
import { Grid, Slider, Typography } from "@mui/material";

export default function Settings() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const cps = useAppSelector(selectCPS);
  const cpl = useAppSelector(selectCPL);

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
        <DialogContent>
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
                    dispatch(setSettings({ cpl: value }));
                }}
                aria-label="Default"
                valueLabelDisplay="auto"
                step={1}
                min={15}
                max={45}
              />
            </Grid>
            <Grid
              item
              container
              xs
              sx={{ width: 450, height: 50 }}
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
                    dispatch(setSettings({ cps: value }));
                }}
                aria-label="Default"
                valueLabelDisplay="auto"
                step={1}
                min={10}
                max={25}
              />
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
