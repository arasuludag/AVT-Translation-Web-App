import { Grid } from "@mui/material";
import { useMemo } from "react";
import { Subtitle } from "../../subtitleSlice";
import AddBox from "./AddBox";
import AddNote from "./AddNote";
import ChractersPerSecond from "./ChractersPerSecond";
import DeleteBox from "./DeleteBox";
import DisplayNote from "./DisplayNote";

interface ChildComponentProps {
  subtitle: Subtitle;
  time: { end: number; start: number };
  text: string;
  readOnly: boolean;
}

export default function BottomToolbar(props: ChildComponentProps) {
  // No need to update any component that doesn't need updating. useMemo is nice.
  const toolbarElements = useMemo(
    () =>
      props.readOnly ? (
        props.subtitle.note ? (
          <DisplayNote text={props.subtitle.note} />
        ) : null
      ) : (
        <>
          <AddNote id={props.subtitle.id} note={props.subtitle.note} />
          <AddBox
            id={props.subtitle.id}
            end_time={props.time.end}
            isInsertedBelow={true}
          />
        </>
      ),
    [props.readOnly, props.subtitle.id, props.subtitle.note, props.time.end]
  );

  return (
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
        {toolbarElements}
        <ChractersPerSecond text={props.text} time={props.time} />
      </Grid>
      {!props.readOnly ? <DeleteBox id={props.subtitle.id} /> : null}
    </Grid>
  );
}
