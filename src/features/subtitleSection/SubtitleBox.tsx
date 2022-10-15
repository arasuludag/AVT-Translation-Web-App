import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from "draft-js-export-html";

import "./subtitleSection.css";
import Alert from "@mui/material/Alert";
import { insertToSubtitle, Subtitle } from "./subtitleSlice";
import { useAppDispatch } from "../../app/hooks";

interface ChildComponentProps {
  subtitle: Subtitle;
  readOnly: boolean;
  index?: number;
}

function SubtitleBox(props: ChildComponentProps) {
  const dispatch = useAppDispatch();

  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createWithContent(
      ContentState.createFromText(props.subtitle.text)
    )
  );

  return (
    <Card sx={{ minWidth: 275, minHeight: 250, margin: "20px" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.subtitle.start_time} - {props.subtitle.end_time}
        </Typography>
        <Editor
          readOnly={props.readOnly}
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onChange={() =>
            dispatch(
              insertToSubtitle({
                id: props.index,
                start_time: props.subtitle.start_time,
                end_time: props.subtitle.end_time,
                text: stateToHTML(editorState.getCurrentContent()),
                note: props.subtitle.note,
                position: props.subtitle.position,
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
        {props.subtitle.note ? (
          <Alert severity="info">{props.subtitle.note}</Alert>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default SubtitleBox;
