import { useAppDispatch } from "../../../../app/hooks";
import { insertBox } from "../../subtitleSlice";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { IconButton } from "@mui/material";
import { useSnackbar } from "notistack";

export default function AddNote(props: { id: number; end_time: number }) {
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
      })
    );
  };

  return (
    <>
      <IconButton onClick={handleClick} title={"Add box below."}>
        <AddBoxIcon />
      </IconButton>
    </>
  );
}
