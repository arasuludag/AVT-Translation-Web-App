import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";

import "../subtitleSection.css";
import Alert from "@mui/material/Alert";
import {
  insertToSubtitle,
  selectActiveSubtitle,
  Subtitle,
} from "../subtitleSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect, useMemo, useState } from "react";
import { CardActions, Grid, InputAdornment, TextField } from "@mui/material";

import AddNote from "./AddNote";
import AddBox from "./AddBox";
import GoToSecondButton from "./GoToSecondButton";
import ChractersPerSecond from "./ChractersPerSecond";
import DeleteBox from "./DeleteBox";
import ChractersPerLine from "./ChractersPerLine";

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

  const chractersPerSecond = useMemo(
    () => <ChractersPerSecond editorState={editorState} time={time} />,
    [editorState, time]
  );

  // So we wouldn't re-render the card every time activeSubtitle state changes.
  const cardContent = useMemo(
    () => (
      <CardContent>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            sx={{ width: "16ch", margin: 1 }}
            id="outlined-number"
            label="Start"
            type="number"
            defaultValue={props.subtitle.start_time}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">ms</InputAdornment>,
            }}
            disabled={props.readOnly}
            size="small"
            onChange={(event) => {
              dispatch(
                insertToSubtitle({
                  subtitle: {
                    start_time: parseInt(event.target.value),
                  },
                  index: props.index,
                })
              );
              setTime({
                ...time,
                ...{ start: parseInt(event.target.value) },
              });
            }}
          />
          <Grid item xs={12} md={2} xl={2}>
            <GoToSecondButton ms={time.start} readOnly={props.readOnly} />
          </Grid>
          <TextField
            sx={{ width: "16ch", margin: 1 }}
            id="outlined-number"
            label="End"
            type="number"
            defaultValue={props.subtitle.end_time}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">ms</InputAdornment>,
            }}
            disabled={props.readOnly}
            size="small"
            onChange={(event) => {
              dispatch(
                insertToSubtitle({
                  subtitle: {
                    end_time: parseInt(event.target.value),
                  },
                  index: props.index,
                })
              );
              setTime({ ...time, ...{ end: parseInt(event.target.value) } });
            }}
          />
        </Grid>
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
          <CardActions>
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
                  end_time={time.end}
                />
                {chractersPerSecond}
              </Grid>
              <DeleteBox index={props.index} />
            </Grid>
          </CardActions>
        ) : null}
      </CardContent>
    ),
    [
      chractersPerSecond,
      dispatch,
      editorState,
      props.index,
      props.readOnly,
      props.subtitle.end_time,
      props.subtitle.note,
      props.subtitle.start_time,
      props.subtitleCount,
      time,
    ]
  );

  return (
    <Card
      raised={raised}
      sx={{
        minHeight: 330,
        margin: "0 10px 10px 10px",
      }}
    >
      {cardContent}
    </Card>
  );
}

export default SubtitleBox;
