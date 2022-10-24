import { CardActions, Grid } from "@mui/material";
import { useMemo } from "react";
import { Subtitle } from "../../subtitleSlice";
import AddBox from "./AddBox";
import AddNote from "./AddNote";
import ChractersPerSecond from "./ChractersPerSecond";
import DeleteBox from "./DeleteBox";

interface ChildComponentProps {
  subtitle: Subtitle;
  time: { end: number; start: number };
  text: string;
}

export default function BottomToolbar(props: ChildComponentProps) {
  // No need to update any component that doesn't need updating. useMemo is nice.
  const toolbar = useMemo(
    () => (
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          item
          xs
        >
          <AddNote id={props.subtitle.id} note={props.subtitle.note} />
          <AddBox id={props.subtitle.id} end_time={props.time.end} />
          <ChractersPerSecond text={props.text} time={props.time} />
        </Grid>
        <DeleteBox id={props.subtitle.id} />
      </Grid>
    ),
    [props.text, props.subtitle.id, props.subtitle.note, props.time]
  );

  return <CardActions>{toolbar}</CardActions>;
}
