import { useAppDispatch } from "../../../../app/hooks";
import { insertBox } from "../../subtitleSlice";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { IconButton } from "@mui/material";
import { useSnackbar } from "notistack";

export default function AddNote(props: {
  index: number;
  end_time: number;
  subtitleCount: number;
}) {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    dispatch(
      insertBox({
        id: props.subtitleCount,
        end_time: props.end_time,
        indexToInsert: props.index + 1,
      })
    );
    enqueueSnackbar(`Added box to ${props.end_time} ms`, {
      variant: "success",
    });
  };

  return (
    <>
      <IconButton onClick={handleClick} title={"Add box below."}>
        <AddBoxIcon />
      </IconButton>
    </>
  );
}
