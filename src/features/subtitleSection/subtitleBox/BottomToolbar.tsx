import { CardActions, Grid } from "@mui/material";
import { EditorState } from "draft-js";
import { useMemo } from "react";
import { Subtitle } from "../subtitleSlice";
import AddBox from "./AddBox";
import AddNote from "./AddNote";
import ChractersPerSecond from "./ChractersPerSecond";
import DeleteBox from "./DeleteBox";

interface ChildComponentProps {
  subtitle: Subtitle;
  subtitleCount: number;
  time: { end: number; start: number };
  index: number;
  editorState: EditorState;
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
          <AddNote index={props.index} note={props.subtitle.note} />
          <AddBox
            index={props.index}
            subtitleCount={props.subtitleCount}
            end_time={props.time.end}
          />
          <ChractersPerSecond
            editorState={props.editorState}
            time={props.time}
          />
        </Grid>
        <DeleteBox index={props.index} subtitleCount={props.subtitleCount} />
      </Grid>
    ),
    [
      props.editorState,
      props.index,
      props.subtitle.note,
      props.subtitleCount,
      props.time,
    ]
  );

  return <CardActions>{toolbar}</CardActions>;
}
