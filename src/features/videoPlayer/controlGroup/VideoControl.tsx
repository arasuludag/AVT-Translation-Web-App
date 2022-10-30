import { Stack } from "@mui/material";
import SeekBackOrForward from "./SeekBackOrForwardButtons";
import ShowCurrentTime from "./ShowCurrentTime";
import SubtitleToggle from "./SubtitleToggle";
import TrackingToggle from "./TrackingToggle";

interface ChildComponentProps {
  currentTime: number;
  onSeek(direction: boolean, howMuch: number): void;
}

export default function VideoControl(props: ChildComponentProps) {
  return (
    <Stack
      sx={{
        position: "absolute",
        right: 0,
        display: "flex",
        zIndex: 3,
        bottom: 75,
        alignItems: "center",
      }}
    >
      <Stack direction="row">
        <SubtitleToggle currentTime={props.currentTime} />
        <TrackingToggle />
      </Stack>

      <SeekBackOrForward
        onSeek={(direction, howMuch) => props.onSeek(direction, howMuch)}
      />

      <ShowCurrentTime currentTime={props.currentTime} />
    </Stack>
  );
}
