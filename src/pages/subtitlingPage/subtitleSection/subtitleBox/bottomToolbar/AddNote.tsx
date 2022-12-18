import { useAppDispatch } from "../../../../../app/hooks";
import { insertToSubtitle } from "../../../../../slices/subtitleSlice";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { useSnackbar } from "notistack";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

export default function AddNote(props: { id: number; note: string }) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(props.note);
  const { enqueueSnackbar } = useSnackbar();

  const icon = () => {
    if (text.length) return <InsertCommentIcon />;
    else return <ModeCommentIcon />;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    enqueueSnackbar(`Note added`, {
      variant: "success",
    });
    setOpen(false);
    dispatch(
      insertToSubtitle({
        subtitle: {
          note: text,
        },
        id: props.id,
      })
    );
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen} title={"Make a note/comment."}>
        {icon()}
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Comment / Note</DialogTitle>

        <DialogContent>
          <ReactQuill
            theme="bubble"
            className="editor"
            value={text}
            onChange={(value) => {
              setText(value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <IconButton onClick={handleSubmit}>{icon()}</IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
