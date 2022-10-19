import { Chip, Grid } from "@mui/material";
import { EditorState } from "draft-js";
import { useMemo } from "react";

export default function CharacterPerLine(props: { editorState: EditorState }) {
  const characterPerLine = useMemo(
    () =>
      props.editorState
        .getCurrentContent()
        .getPlainText()
        .split("\n")
        .map((line, index) => {
          const lineLength = line.length;
          let color = "Gainsboro";
          if (lineLength > 44) color = "Maroon";
          else if (lineLength > 29) color = "Wheat";
          return (
            <Chip
              key={index}
              label={line.length}
              variant="outlined"
              sx={{ margin: "2px 0" }}
              style={{ color: color, borderColor: color }}
            />
          );
        }),
    [props.editorState]
  );

  return (
    <Grid
      item
      xs={2}
      sx={{
        top: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "60px 0 0 0",
      }}
    >
      {characterPerLine}
    </Grid>
  );
}
