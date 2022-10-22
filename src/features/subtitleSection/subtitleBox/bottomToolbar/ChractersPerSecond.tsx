import { Chip } from "@mui/material";
import { EditorState } from "draft-js";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../app/hooks";
import { selectCPS } from "../../../settings/settingsSlice";

export default function CharacterPerSecond(props: {
  editorState: EditorState;
  time: { start: number; end: number };
}) {
  const [cps, setCPS] = useState<number>(0);
  const [color, setcolor] = useState<string | undefined>("Gainsboro");

  const recievedCPS = useAppSelector(selectCPS);

  const totalBoxLength = props.editorState
    .getCurrentContent()
    .getPlainText().length;

  useEffect(() => {
    // If "|| 0" isn't there, it causes a NaN on some edge cases.
    setCPS(totalBoxLength / ((props.time.end - props.time.start) / 1000) || 0);
  }, [props, totalBoxLength]);

  useEffect(() => {
    setcolor(undefined);
    if (cps >= recievedCPS + 3) setcolor("Maroon");
    else if (cps >= recievedCPS) setcolor("DarkGoldenRod");
  }, [cps, recievedCPS]);

  return (
    <Chip
      label={Math.round(cps)}
      variant="filled"
      sx={{ margin: "0 5px", opacity: "50%" }}
      style={{ backgroundColor: color }}
      title="Chracters per second"
    />
  );
}
