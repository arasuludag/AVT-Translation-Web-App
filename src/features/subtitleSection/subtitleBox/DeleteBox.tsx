import { IconButton } from "@mui/material";
import { useAppDispatch } from "../../../app/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteBox } from "../subtitleSlice";
import SnackbarAlert from "../Snackbar";
import { useState } from "react";

export default function DeleteBox(props: {
  index: number;
  subtitleCount: number;
}) {
  const dispatch = useAppDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClick = () => {
    if (props.subtitleCount > 1)
      dispatch(
        deleteBox({
          index: props.index,
        })
      );
    else setOpenSnackbar(true);
  };

  return (
    <div>
      <IconButton onClick={handleClick} color="error">
        <DeleteIcon />
      </IconButton>
      <SnackbarAlert
        severity="error"
        message="You cannot delete the last box!"
        isOpen={openSnackbar}
        handleClose={(open) => setOpenSnackbar(open)}
      />
    </div>
  );
}
