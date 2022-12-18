import * as React from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { setIsTrackedSubtitle } from "../../../../slices/subtitleSlice";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import GpsNotFixedIcon from "@mui/icons-material/GpsNotFixed";
import { IconButton } from "@mui/material";

export default function TrackingToggle() {
  const [selected, setSelected] = React.useState(false);

  const dispatch = useAppDispatch();

  return (
    <IconButton
      color="primary"
      size="small"
      title="Track subtitle while playing"
      onClick={() => {
        dispatch(setIsTrackedSubtitle(!selected));
        setSelected(!selected);
      }}
    >
      {selected ? <GpsFixedIcon /> : <GpsNotFixedIcon />}
    </IconButton>
  );
}
