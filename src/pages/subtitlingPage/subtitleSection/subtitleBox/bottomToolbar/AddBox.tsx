import { useAppDispatch } from "../../../../../app/hooks";
import { insertBox } from "../../../../../slices/subtitleSlice";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { IconButton } from "@mui/material";
import { useSnackbar } from "notistack";

export default function AddNote(props: {
  id: number;
  end_time: number;
  isInsertedBelow: boolean;
}) {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar(`Added box to ${props.end_time} ms`, {
      variant: "success",
    });
    dispatch(
      insertBox({
        end_time: props.end_time,
        idToInsert: props.id,
        isInsertedBelow: props.isInsertedBelow,
      })
    );
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        title={props.isInsertedBelow ? "Add box below." : "Add box here."}
      >
        <AddBoxIcon />
      </IconButton>
    </>
  );
}
