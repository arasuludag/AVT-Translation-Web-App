import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import { IconButton } from "@mui/material";
import { useAppDispatch } from "../../../../app/hooks";
import { setVideoTime } from "../../../../slices/videoSlice";
import { setSubtitleToDisplay } from "../../../../slices/subtitleSlice";

export default function GoToSecondButton(props: {
  ms: number;
  readOnly: boolean;
}) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (props.readOnly) dispatch(setSubtitleToDisplay(false));
    else dispatch(setSubtitleToDisplay(true));

    dispatch(setVideoTime(props.ms));
  };

  return (
    <IconButton
      onClick={handleClick}
      title={"Go to " + props.ms}
      className="goToSecondButton"
      sx={{ width: "30px", height: "30px", margin: "0 auto" }}
      size="small"
    >
      <PlayCircleFilledWhiteIcon />
    </IconButton>
  );
}
