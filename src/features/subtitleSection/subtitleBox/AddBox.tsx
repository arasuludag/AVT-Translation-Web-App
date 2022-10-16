import { Button } from "@mui/material";
import { useAppDispatch } from "../../../app/hooks";
import { insertBox } from "../subtitleSlice";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default function AddNote(props: {
  index: number;
  end_time: number;
  subtitleCount: number;
}) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(
      insertBox({
        id: props.subtitleCount,
        end_time: props.end_time,
        indexToInsert: props.index + 1,
      })
    );
  };

  return (
    <Button onClick={handleClick} size="small">
      <AddBoxIcon />
    </Button>
  );
}
