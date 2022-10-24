import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Alert from "@mui/material/Alert";
import {
  insertToSubtitle,
  selectActiveSubtitle,
  Subtitle,
} from "../subtitleSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect, useMemo, useRef, useState } from "react";
import { Grid } from "@mui/material";

import ChractersPerLine from "./ChractersPerLine";
import TopToolbar from "./TopToolbar";
import BottomToolbar from "./bottomToolbar/BottomToolbar";

const h2p = require("html2plaintext");

interface ChildComponentProps {
  subtitle: Subtitle;
  readOnly: boolean;
}

function SubtitleBox(props: ChildComponentProps) {
  const dispatch = useAppDispatch();
  const activeSubtitle = useAppSelector(selectActiveSubtitle);
  const [text, setText] = useState(props.subtitle.text);
  const [time, setTime] = useState({
    start: props.subtitle.start_time,
    end: props.subtitle.end_time,
  }); // For the "Goto button" and other componenents that need updated time.

  const [raised, setRaised] = useState(false);

  useEffect(() => {
    if (
      activeSubtitle.id === props.subtitle.id &&
      ((activeSubtitle.whichOne === "original" && props.readOnly) ||
        (activeSubtitle.whichOne === "workingOn" && !props.readOnly))
    )
      setRaised(true);
    else setRaised(false);
  }, [activeSubtitle, props.readOnly, props.subtitle.id]);

  const optimizedTopToolbar = useMemo(
    () => (
      <TopToolbar
        readOnly={props.readOnly}
        id={props.subtitle.id}
        time={time}
        setTime={(timeRecieved) => setTime({ ...time, ...timeRecieved })}
      />
    ),
    [props.subtitle.id, props.readOnly, time]
  );

  const optimizedEditor = useMemo(
    () => (
      <Grid container>
        <Grid item xs={10}>
          <ReactQuill
            theme="snow"
            className="editor"
            value={text}
            onChange={(value) => {
              dispatch(
                insertToSubtitle({
                  subtitle: {
                    text: value,
                  },
                  id: props.subtitle.id,
                })
              );
              setText(value);
            }}
            readOnly={props.readOnly}
            modules={{
              toolbar: [["bold", "italic", "underline"], ["clean"]],
            }}
            formats={["bold", "italic", "underline"]}
          />
        </Grid>
        <ChractersPerLine text={h2p(text)} />
      </Grid>
    ),
    [dispatch, text, props.readOnly, props.subtitle.id]
  );

  const optimizedNoteDisplay = useMemo(
    () =>
      props.readOnly && props.subtitle.note ? (
        <Alert sx={{ borderRadius: 5 }} severity="info">
          {props.subtitle.note}
        </Alert>
      ) : null,
    [props.readOnly, props.subtitle.note]
  );

  const optimizedBottomToolbar = useMemo(
    () =>
      !props.readOnly ? (
        <BottomToolbar subtitle={props.subtitle} time={time} text={h2p(text)} />
      ) : null,
    [props.readOnly, props.subtitle, time, text]
  );

  return (
    <Card
      raised={raised}
      sx={{
        minHeight: 320,
        maxWidth: 600,
        margin: "20px auto",
        borderRadius: 5,
      }}
    >
      <CardContent>
        {optimizedTopToolbar}
        {optimizedEditor}
        {optimizedNoteDisplay}
        {optimizedBottomToolbar}
      </CardContent>
    </Card>
  );
}

export default SubtitleBox;
