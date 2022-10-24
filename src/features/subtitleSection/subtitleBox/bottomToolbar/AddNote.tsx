import { useAppDispatch } from "../../../../app/hooks";
import { insertToSubtitle } from "../../subtitleSlice";
import { useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { useSnackbar } from "notistack";

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
    enqueueSnackbar(`Added this note: ${text}`, {
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

        <DialogContent sx={{ minWidth: "400px" }}>
          <Typography>Preview:</Typography>
          <Alert severity="info">{text}</Alert>
          <TextField
            autoFocus
            multiline
            defaultValue={text}
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
