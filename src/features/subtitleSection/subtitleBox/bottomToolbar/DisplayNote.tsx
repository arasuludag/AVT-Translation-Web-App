import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";
import parse from "html-react-parser";
import React from "react";

export default function CustomizedTooltips(props: { text: string }) {
  return (
    <Tooltip title={<React.Fragment>{parse(props.text)}</React.Fragment>}>
      <IconButton>
        <StickyNote2Icon />
      </IconButton>
    </Tooltip>
  );
}
