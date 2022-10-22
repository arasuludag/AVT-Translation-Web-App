import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectActiveSubtitle,
  setActiveSubtitle,
  setSubtitleToDisplay,
} from "../../subtitleSection/subtitleSlice";
import AlignHorizontalRightIcon from "@mui/icons-material/AlignHorizontalRight";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";

export default function SubtitleToggle(props: { currentTime: number }) {
  const dispatch = useAppDispatch();
  const activeSubtitle = useAppSelector(selectActiveSubtitle);

  const children = [
    <ToggleButton value="original" key="original">
      <AlignHorizontalRightIcon />
    </ToggleButton>,
    <ToggleButton value="workingOn" key="workingOn">
      <AlignHorizontalLeftIcon />
    </ToggleButton>,
  ];

  const handleChange = () => {
    if (activeSubtitle.whichOne === "workingOn")
      dispatch(setSubtitleToDisplay("original"));
    else dispatch(setSubtitleToDisplay("workingOn"));

    dispatch(setActiveSubtitle(props.currentTime));
  };

  return (
    <ToggleButtonGroup
      className="subtitleSelectionToggle"
      value={activeSubtitle.whichOne}
      onChange={handleChange}
      exclusive
      size="small"
      color="primary"
    >
      {children}
    </ToggleButtonGroup>
  );
}
