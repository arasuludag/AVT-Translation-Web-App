import { Button } from "@mui/material";
import { useAppDispatch } from "../../../app/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteBox } from "../subtitleSlice";

export default function DeleteBox(props: { index: number }) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(
      deleteBox({
        index: props.index,
      })
    );
  };

  return (
    <Button onClick={handleClick} color="error" size="small">
      <DeleteIcon />
    </Button>
  );
}
