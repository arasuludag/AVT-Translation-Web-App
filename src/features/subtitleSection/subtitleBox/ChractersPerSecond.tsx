import { Chip } from "@mui/material";
import { EditorState } from "draft-js";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectCPS } from "../../settings/settingsSlice";

export default function CharacterPerSecond(props: {
  editorState: EditorState;
  time: { start: number; end: number };
}) {
  const [cps, setCPS] = useState<number>(0);
  const [color, setcolor] = useState("white");

  const recievedCPS = useAppSelector(selectCPS);

  const totalBoxLength = props.editorState
    .getCurrentContent()
    .getPlainText().length;

  useEffect(() => {
    setCPS(totalBoxLength / ((props.time.end - props.time.start) / 1000));
  }, [props, totalBoxLength]);

  useEffect(() => {
    setcolor("Gainsboro");
    if (cps >= recievedCPS + 3) setcolor("Maroon");
    else if (cps >= recievedCPS) setcolor("Wheat");
  }, [cps, recievedCPS]);

  return (
    <Chip
      label={Math.round(cps)}
      variant="outlined"
      sx={{ margin: "2px 0" }}
      style={{ color: color, borderColor: color }}
      title="Chracters per second"
    />
  );
}
