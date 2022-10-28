import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

import {
  insertToSubtitle,
  selectActiveSubtitle,
  Subtitle,
} from "../subtitleSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect, useMemo, useState } from "react";
import { CardActions, Grid } from "@mui/material";

import ChractersPerLine from "./ChractersPerLine";
import TopToolbar from "./TopToolbar";
import BottomToolbar from "./bottomToolbar/BottomToolbar";
import DisplayNote from "./bottomToolbar/DisplayNote";

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
      ((!activeSubtitle.isWorkingOn && props.readOnly) ||
        (activeSubtitle.isWorkingOn && !props.readOnly))
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
            theme="bubble"
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
              toolbar: props.readOnly
                ? []
                : [["bold", "italic", "underline"], ["clean"]],
            }}
            formats={props.readOnly ? [] : ["bold", "italic", "underline"]}
          />
        </Grid>
        <ChractersPerLine text={h2p(text)} />
      </Grid>
    ),
    [dispatch, text, props.readOnly, props.subtitle.id]
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
        minHeight: 255,
        maxWidth: 600,
        margin: "20px auto",
        borderRadius: 5,
      }}
    >
      <CardContent>
        {optimizedTopToolbar}
        {optimizedEditor}
        <CardActions>
          {props.readOnly && props.subtitle.note ? (
            <DisplayNote text={props.subtitle.note} />
          ) : null}
          {optimizedBottomToolbar}
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default SubtitleBox;
