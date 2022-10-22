import { IconButton } from "@mui/material";
import { useAppDispatch } from "../../../../app/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteBox } from "../../subtitleSlice";
import { useSnackbar } from "notistack";

export default function DeleteBox(props: {
  index: number;
  subtitleCount: number;
}) {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    if (props.subtitleCount > 1) {
      dispatch(
        deleteBox({
          index: props.index,
        })
      );
      enqueueSnackbar("Deleted box", { variant: "success" });
    } else
      enqueueSnackbar("You can't delete the last box!", { variant: "error" });
  };

  return (
    <IconButton onClick={handleClick} color="error">
      <DeleteIcon />
    </IconButton>
  );
}
