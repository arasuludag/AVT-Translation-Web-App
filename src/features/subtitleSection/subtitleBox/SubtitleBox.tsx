import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";

import Alert from "@mui/material/Alert";
import {
  insertToSubtitle,
  selectActiveSubtitle,
  Subtitle,
} from "../subtitleSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect, useMemo, useState } from "react";
import { Grid } from "@mui/material";

import ChractersPerLine from "./ChractersPerLine";
import TopToolbar from "./TopToolbar";
import BottomToolbar from "./bottomToolbar/BottomToolbar";

interface ChildComponentProps {
  subtitle: Subtitle;
  readOnly: boolean;
  subtitleCount: number;
  index: number;
}

function SubtitleBox(props: ChildComponentProps) {
  const dispatch = useAppDispatch();
  const activeSubtitle = useAppSelector(selectActiveSubtitle);

  const [time, setTime] = useState({
    start: props.subtitle.start_time,
    end: props.subtitle.end_time,
  }); // For the "Goto button" and other componenents that need updated time.

  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(stateFromHTML(props.subtitle.text))
  );

  const [raised, setRaised] = useState(false);

  useEffect(() => {
    if (
      ((activeSubtitle.whichOne === "original" && props.readOnly) ||
        (activeSubtitle.whichOne === "workingOn" && !props.readOnly)) &&
      activeSubtitle.index === props.index
    )
      setRaised(true);
    else setRaised(false);
  }, [activeSubtitle, props.subtitle.id, props.readOnly, props.index]);

  // So we wouldn't re-render the card every time activeSubtitle state changes.
  const cardContent = useMemo(
    () => (
      <CardContent>
        <TopToolbar
          subtitle={props.subtitle}
          readOnly={props.readOnly}
          index={props.index}
          time={time}
          setTime={(timeRecieved) => setTime({ ...time, ...timeRecieved })}
        />
        <Grid container>
          <Grid item xs={10}>
            <Editor
              readOnly={props.readOnly}
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              spellCheck
              onChange={() =>
                dispatch(
                  insertToSubtitle({
                    subtitle: {
                      text: stateToHTML(editorState.getCurrentContent()),
                    },
                    index: props.index,
                  })
                )
              }
              onEditorStateChange={setEditorState}
              toolbar={{
                options: props.readOnly ? [] : ["inline", "history"],
                inline: {
                  options: props.readOnly
                    ? []
                    : ["bold", "italic", "underline"],
                },
              }}
            />
          </Grid>
          <ChractersPerLine editorState={editorState} />
        </Grid>
        {props.readOnly && props.subtitle.note ? (
          <Alert severity="info">{props.subtitle.note}</Alert>
        ) : null}
        {!props.readOnly ? (
          <BottomToolbar
            subtitle={props.subtitle}
            subtitleCount={props.subtitleCount}
            time={time}
            index={props.index}
            editorState={editorState}
          />
        ) : null}
      </CardContent>
    ),
    [
      dispatch,
      editorState,
      props.index,
      props.readOnly,
      props.subtitle,
      props.subtitleCount,
      time,
    ]
  );

  return (
    <Card
      raised={raised}
      sx={{
        minHeight: 335,
        maxWidth: 600,
        margin: "20px auto",
        borderRadius: 5,
      }}
    >
      {cardContent}
    </Card>
  );
}

export default SubtitleBox;
