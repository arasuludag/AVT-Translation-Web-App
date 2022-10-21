import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import { IconButton } from "@mui/material";
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
    <IconButton
      onClick={handleClick}
      title={"Go to " + props.ms}
      className="goToSecondButton"
      sx={{ margin: 1 }}
    >
      <PlayCircleFilledWhiteIcon />
    </IconButton>
  );
}
