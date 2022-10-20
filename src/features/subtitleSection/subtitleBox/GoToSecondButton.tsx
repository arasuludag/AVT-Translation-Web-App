import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import { Button } from "@mui/material";
import { useAppDispatch } from "../../../app/hooks";
import { setVideoTime } from "../../videoPlayer/videoSlice";
import { setSubtitleToDisplay } from "../subtitleSlice";

export default function GoToSecondButton(props: {
  ms: number;
  readOnly: boolean;
}) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (props.readOnly) dispatch(setSubtitleToDisplay("original"));
    else dispatch(setSubtitleToDisplay("workingOn"));

    dispatch(setVideoTime(props.ms));
  };

  return (
    <Button
      onClick={handleClick}
      size="small"
      className="goToSecondButton"
      sx={{ margin: 1 }}
    >
      <PlayCircleFilledWhiteIcon />
    </Button>
  );
}
