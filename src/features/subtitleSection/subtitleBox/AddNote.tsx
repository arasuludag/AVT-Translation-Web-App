import { useAppDispatch } from "../../../app/hooks";
import { insertToSubtitle } from "../subtitleSlice";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import InsertCommentIcon from "@mui/icons-material/InsertComment";

export default function AddNote(props: { index: number; note: string }) {
  const dispatch = useAppDispatch();
  const [displayedNote, setDisplayedNote] = useState(props.note);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const icon = () => {
    if (displayedNote.length) return <InsertCommentIcon />;
    else return <ModeCommentIcon />;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    dispatch(
      insertToSubtitle({
        subtitle: {
          note: text,
        },
        index: props.index,
      })
    );
    setDisplayedNote(text);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen} title={"Make a note/comment."}>
        {icon()}
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Comment / Note</DialogTitle>

        <DialogContent>
          <Typography>{displayedNote}</Typography>
          <TextField
            autoFocus
            multiline
            rows={4}
            id="name"
            onChange={(event) => {
              setText(event.target.value);
            }}
            fullWidth
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
