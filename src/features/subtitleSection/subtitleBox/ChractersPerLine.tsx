import { Chip, Grid } from "@mui/material";
import { useMemo } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectCPL } from "../../settings/settingsSlice";

export default function CharacterPerLine(props: { text: string }) {
  const recievedCPL = useAppSelector(selectCPL);

  const characterPerLine = useMemo(
    () =>
      props.text.split("\n").map((line, index) => {
        const lineLength = line.length;
        if (lineLength === 0) return null;
        let color = undefined;
        if (lineLength >= recievedCPL + 15) color = "Maroon";
        else if (lineLength >= recievedCPL) color = "DarkGoldenRod";
        return (
          <Chip
            key={index}
            label={line.length}
            title="Chracters per line"
            variant="filled"
            sx={{
              margin: "2px 0",
              opacity: "50%",
              width: "40px",
              height: "20px",
              overflow: "visible",
            }}
            style={{ backgroundColor: color }}
          />
        );
      }),
    [props.text, recievedCPL]
  );

  return (
    <Grid
      item
      xs={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "8px 0 0 0",
      }}
    >
      {characterPerLine}
    </Grid>
  );
}
