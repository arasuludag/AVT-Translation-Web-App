import { IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteBox, selectSubtitleCount } from "../../subtitleSlice";
import { useSnackbar } from "notistack";

export default function DeleteBox(props: { id: number }) {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const subtitleCount = useAppSelector(selectSubtitleCount);

  const handleClick = () => {
    if (subtitleCount > 1) {
      enqueueSnackbar("Deleted box", { variant: "success" });

      dispatch(deleteBox(props.id));
    } else
      enqueueSnackbar("You can't delete the last box!", { variant: "error" });
  };

  return (
    <IconButton onClick={handleClick} color="error">
      <DeleteIcon />
    </IconButton>
  );
}
