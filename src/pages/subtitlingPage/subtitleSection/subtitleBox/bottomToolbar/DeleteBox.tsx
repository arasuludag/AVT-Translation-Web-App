import { IconButton } from "@mui/material";
import { useAppDispatch } from "../../../../../app/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteBox } from "../../../../../slices/subtitleSlice";
import { useSnackbar } from "notistack";

export default function DeleteBox(props: { id: number }) {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar("Deleted box", { variant: "success" });

    dispatch(deleteBox(props.id));
  };

  return (
    <IconButton onClick={handleClick} color="error">
      <DeleteIcon />
    </IconButton>
  );
}
