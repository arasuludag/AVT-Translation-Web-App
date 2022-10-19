import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function ShowCurrentTime(props: { currentTime: number }) {
  return (
    <Stack direction="row" spacing={1}>
      <Chip icon={<AccessTimeIcon />} label={props.currentTime} />
    </Stack>
  );
}
