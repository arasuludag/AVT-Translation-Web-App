import { Chip, Stack } from "@mui/material";
import { useMemo } from "react";
import { useAppSelector } from "../../../../app/hooks";
import { selectCPL } from "../../../../slices/settingsSlice";

export default function CharacterPerLine(props: { text: string }) {
  const recievedCPL = useAppSelector(selectCPL);

  const characterPerLine = useMemo(
    () =>
      props.text.split("\n").map((line, index) => {
        const lineLength = line.length;
        if (index > 4) return null; // We shouldn't have more than 3 rows.
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
    <Stack
      sx={{
        margin: "3px 0 0 0",
      }}
    >
      {characterPerLine}
    </Stack>
  );
}
