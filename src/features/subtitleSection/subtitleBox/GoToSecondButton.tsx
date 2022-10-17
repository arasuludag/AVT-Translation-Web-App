import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import { Button } from "@mui/material";
import { useAppDispatch } from "../../../app/hooks";
import { setVideoTime } from "../../videoPlayer/videoSlice";

export default function GoToSecondButton(props: { ms: number }) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setVideoTime(props.ms));
  };

  return (
    <Button onClick={handleClick} size="small" className="goToSecondButton">
      <PlayCircleFilledWhiteIcon />
    </Button>
  );
}
