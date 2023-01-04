import { Chip } from "@mui/material";
import { useAppSelector } from "../../../../../app/hooks";
import { selectCPS } from "../../../../../slices/settingsSlice";

export default function CharacterPerSecond(props: {
  text: string;
  time: { start: number; end: number };
}) {
  const recievedCPS = useAppSelector(selectCPS);
  const totalBoxLength = props.text.replace(/\n/g, "").length;
  const cps = totalBoxLength / ((props.time.end - props.time.start) / 1000);

  let backgroundColor = "gray";
  if (cps >= recievedCPS + 3) backgroundColor = "Maroon";
  else if (cps >= recievedCPS) backgroundColor = "DarkGoldenRod";

  return (
    <Chip
      label={Math.round(cps)}
      variant="filled"
      sx={{
        margin: "0 5px",
        opacity: "50%",
        backgroundColor: backgroundColor,
        color: "white",
      }}
      title="Chracters per second"
    />
  );
}
