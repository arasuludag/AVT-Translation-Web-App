import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContentText } from "@mui/material";

interface FormDialogObj {
  buttonName: string;
  text: string;
  onSubmit(text: string): any;
}

export default function FormDialog(props: FormDialogObj) {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    props.onSubmit(text);
  };

  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>
        {props.buttonName}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.buttonName}</DialogTitle>

        <DialogContent>
          <DialogContentText>{props.text}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={props.buttonName}
            onChange={(event) => {
              setText(event.target.value);
            }}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{props.buttonName}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
