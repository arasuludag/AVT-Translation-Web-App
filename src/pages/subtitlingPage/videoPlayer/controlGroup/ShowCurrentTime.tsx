import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function ShowCurrentTime(props: { currentTime: number }) {
  return (
    <Chip icon={<AccessTimeIcon />} label={props.currentTime} color="primary" />
  );
}
