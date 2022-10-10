import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "./subtitleSection.css";

interface Subtitle {
  start_time: string;
  end_time: string;
  text: string;
}

interface ChildComponentProps {
  subtitle: Subtitle;
  readOnly: boolean;
}

function SubtitleBox(props: ChildComponentProps) {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createWithContent(
      ContentState.createFromText(props.subtitle.text)
    )
  );

  console.log(editorState);

  return (
    <Card sx={{ minWidth: 275, margin: "20px" }}>
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
          onEditorStateChange={setEditorState}
          toolbar={{
            options: ["inline", "history"],
            inline: {
              options: ["bold", "italic"],
            },
          }}
        />
      </CardContent>
    </Card>
  );
}

export default SubtitleBox;
