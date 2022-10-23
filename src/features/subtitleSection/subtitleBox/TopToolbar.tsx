import { Grid, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { insertToSubtitle } from "../subtitleSlice";
import GoToSecondButton from "./GoToSecondButton";

interface Time {
  start: number;
  end: number;
}

interface TopToolbarProps {
  readOnly: boolean;
  index: number;
  time: Time;
  setTime(time: Partial<Time>): void;
}

export default function TopToolbar(props: TopToolbarProps) {
  const dispatch = useAppDispatch();
  const [time, setTime] = useState<Time>(props.time);
  const [error, setError] = useState(false);

  function msToHMS(ms: number) {
    if (ms > 0) return new Date(ms).toISOString().slice(11, 21);
    else return "";
  }

  useEffect(() => {
    if (time.end < time.start) setError(true);
    else setError(false);
  }, [time.end, time.start]);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <TextField
        sx={{ width: "16ch", margin: 1 }}
        id="outlined-number"
        label={msToHMS(time.start)}
        type="number"
        error={error}
        defaultValue={time.start || 0}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">ms</InputAdornment>,
        }}
        disabled={props.readOnly}
        size="small"
        onChange={(event) => {
          dispatch(
            insertToSubtitle({
              subtitle: {
                start_time: parseInt(event.target.value),
              },
              index: props.index,
            })
          );
          props.setTime({ start: parseInt(event.target.value) });
          setTime({ ...time, ...{ start: parseInt(event.target.value) } });
        }}
      />
      <Grid item xs={12} md={2} xl={2}>
        <GoToSecondButton ms={time.start || 0} readOnly={props.readOnly} />
      </Grid>
      <TextField
        sx={{ width: "16ch", margin: 1 }}
        id="outlined-number"
        label={msToHMS(time.end)}
        type="number"
        error={error}
        defaultValue={time.end || 0}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">ms</InputAdornment>,
        }}
        disabled={props.readOnly}
        size="small"
        onChange={(event) => {
          dispatch(
            insertToSubtitle({
              subtitle: {
                end_time: parseInt(event.target.value),
              },
              index: props.index,
            })
          );
          props.setTime({ end: parseInt(event.target.value) });
          setTime({ ...time, ...{ end: parseInt(event.target.value) } });
        }}
      />
    </Grid>
  );
}
