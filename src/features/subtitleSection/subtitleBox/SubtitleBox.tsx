import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from "draft-js-export-html";

import "../subtitleSection.css";
import Alert from "@mui/material/Alert";
import {
  insertToSubtitle,
  selectActiveSubtitle,
  selectWhichSubToShow,
  Subtitle,
} from "../subtitleSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect, useState } from "react";
import { CardActions, InputAdornment, TextField } from "@mui/material";

import AddNote from "./AddNote";
import AddBox from "./AddBox";
import GoToSecondButton from "./GoToSecondButton";

interface ChildComponentProps {
  subtitle: Subtitle;
  readOnly: boolean;
  subtitleCount: number;
  index: number;
}

function SubtitleBox(props: ChildComponentProps) {
  const dispatch = useAppDispatch();
  const activeSubtitle = useAppSelector(selectActiveSubtitle);
  const whichSubToShow = useAppSelector(selectWhichSubToShow);

  const [border, setBorder] = useState<number>(0);
  const [startTime, setStartTime] = useState(props.subtitle.start_time); // For the "Goto button"

  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(
      ContentState.createFromText(props.subtitle.text)
    )
  );

  useEffect(() => {
    if (
      ((whichSubToShow === "original" && props.readOnly) ||
        (whichSubToShow === "workingOn" && !props.readOnly)) &&
      activeSubtitle === props.index
    )
      setBorder(1);
    else setBorder(0);
  }, [
    activeSubtitle,
    props.subtitle.id,
    whichSubToShow,
    props.readOnly,
    props.index,
  ]);

  return (
    <Card
      sx={{
        minWidth: 275,
        height: 300,
        margin: "20px",
        border: border,
        borderRadius: 3,
      }}
    >
      <CardContent>
        <TextField
          sx={{ width: "15ch", right: 15 }}
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
            setStartTime(parseInt(event.target.value));
          }}
        />
        <GoToSecondButton ms={startTime} />
        <TextField
          sx={{ width: "15ch", left: 15 }}
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
          onChange={(event) =>
            dispatch(
              insertToSubtitle({
                subtitle: {
                  end_time: parseInt(event.target.value),
                },
                index: props.index,
              })
            )
          }
        />
        <Editor
          readOnly={props.readOnly}
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
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
              options: props.readOnly ? [] : ["bold", "italic", "underline"],
            },
          }}
        />
        {props.readOnly && props.subtitle.note ? (
          <Alert severity="info">{props.subtitle.note}</Alert>
        ) : null}
        {!props.readOnly ? (
          <CardActions>
            <AddNote index={props.index} note={props.subtitle.note} />
            <AddBox
              index={props.index}
              subtitleCount={props.subtitleCount}
              end_time={props.subtitle.end_time}
            />
          </CardActions>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default SubtitleBox;
