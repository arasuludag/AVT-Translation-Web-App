import { Stack } from "@mui/material";
import SeekBackOrForward from "./SeekBackOrForwardButtons";
import ShowCurrentTime from "./ShowCurrentTime";
import SubtitleToggle from "./SubtitleToggle";

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
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <SubtitleToggle currentTime={props.currentTime} />
      <SeekBackOrForward
        onSeek={(direction, howMuch) => props.onSeek(direction, howMuch)}
      />

      <ShowCurrentTime currentTime={props.currentTime} />
    </Stack>
  );
}
