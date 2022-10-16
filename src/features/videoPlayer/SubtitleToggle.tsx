import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectWhichSubToShow,
  setSubtitleToDisplay,
} from "../subtitleSection/subtitleSlice";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export default function SubtitleToggle() {
  const dispatch = useAppDispatch();
  const whichSubToShow = useAppSelector(selectWhichSubToShow);

  const children = [
    <ToggleButton value="original" key="original">
      <ArrowLeftIcon />
    </ToggleButton>,
    <ToggleButton value="workingOn" key="workingOn">
      <ArrowRightIcon />
    </ToggleButton>,
  ];

  const handleChange = () => {
    if (whichSubToShow === "workingOn")
      dispatch(setSubtitleToDisplay("original"));
    else dispatch(setSubtitleToDisplay("workingOn"));
  };

  return (
    <ToggleButtonGroup
      className="subtitleSelectionToggle"
      value={whichSubToShow}
      onChange={handleChange}
      exclusive
      size="small"
      aria-label="Small sizes"
    >
      {children}
    </ToggleButtonGroup>
  );
}
