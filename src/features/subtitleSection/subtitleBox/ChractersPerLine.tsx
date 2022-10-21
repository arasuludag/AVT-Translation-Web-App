import { Chip, Grid } from "@mui/material";
import { EditorState } from "draft-js";
import { useMemo } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectCPL } from "../../settings/settingsSlice";

export default function CharacterPerLine(props: { editorState: EditorState }) {
  const recievedCPL = useAppSelector(selectCPL);

  const characterPerLine = useMemo(
    () =>
      props.editorState
        .getCurrentContent()
        .getPlainText()
        .split("\n")
        .map((line, index) => {
          const lineLength = line.length;
          let color = undefined;
          if (lineLength >= recievedCPL + 15) color = "Maroon";
          else if (lineLength >= recievedCPL) color = "DarkGoldenRod";
          return (
            <Chip
              key={index}
              label={line.length}
              variant="filled"
              sx={{ margin: "2px 0", opacity: "50%" }}
              style={{ backgroundColor: color }}
            />
          );
        }),
    [props.editorState, recievedCPL]
  );

  return (
    <Grid
      item
      xs={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "58px 0 0 0",
      }}
    >
      {characterPerLine}
    </Grid>
  );
}
