import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import RestoreIcon from "@mui/icons-material/Restore";
import UpdateIcon from "@mui/icons-material/Update";
import { useAppSelector } from "../../app/hooks";
import { selectSeekAmount } from "../settings/settingsSlice";

interface Seek {
  onSeek(direction: boolean, howMuch: number): void;
}

export default function SeekBackOrForward(props: Seek) {
  const seekAmount = useAppSelector(selectSeekAmount);

  function handleClick(direction: boolean) {
    props.onSeek(direction, seekAmount / 1000);
  }

  return (
    <Box
      sx={{
        display: "flex",
        color: "white",
        flexDirection: "column",
        alignItems: "center",
        "& > *": {
          m: 1,
        },
      }}
    >
      <ButtonGroup variant="outlined">
        <Button
          style={{ color: "white", borderColor: "white", zIndex: 2 }}
          onClick={() => handleClick(false)}
        >
          <RestoreIcon />
        </Button>
        <Button
          style={{ color: "white", borderColor: "white", zIndex: 2 }}
          onClick={() => handleClick(true)}
        >
          <UpdateIcon />
        </Button>
      </ButtonGroup>
    </Box>
  );
}
