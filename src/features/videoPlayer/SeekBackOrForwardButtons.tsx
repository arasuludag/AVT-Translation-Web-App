import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import RestoreIcon from "@mui/icons-material/Restore";
import UpdateIcon from "@mui/icons-material/Update";

interface Seek {
  onSeek(direction: boolean, howMuch: number): void;
}

export default function SeekBackOrForward(props: Seek) {
  function handleClick(direction: boolean) {
    props.onSeek(direction, 0.03);
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
