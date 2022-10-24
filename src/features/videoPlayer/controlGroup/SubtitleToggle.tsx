import { styled, Switch } from "@mui/material";
import subtitleIcon from "./subtitleIcon.svg";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectActiveSubtitle,
  setActiveSubtitle,
  setSubtitleToDisplay,
} from "../../subtitleSection/subtitleSlice";

export default function SubtitleToggle(props: { currentTime: number }) {
  const dispatch = useAppDispatch();
  const activeSubtitle = useAppSelector(selectActiveSubtitle);

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      transform: "translateX(6px)",

      backgroundImage: `url(${subtitleIcon})`,
      "&.Mui-checked": {
        transform: "translateX(28px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url(${subtitleIcon})`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: "#FFF",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor:
        theme.palette.mode === "dark" ? "#000" : theme.palette.primary.light,
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${subtitleIcon})`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      borderRadius: 20 / 2,
      backgroundColor: "#FFF",
    },
  }));

  const handleChange = (checked: boolean) => {
    if (checked) dispatch(setSubtitleToDisplay("workingOn"));
    else dispatch(setSubtitleToDisplay("original"));

    dispatch(setActiveSubtitle(props.currentTime));
  };

  return (
    <MaterialUISwitch
      onChange={(event, checked) => handleChange(checked)}
      checked={activeSubtitle.whichOne === "workingOn" ? true : false}
    />
  );
}
