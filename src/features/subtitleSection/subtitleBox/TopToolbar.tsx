import {
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { insertToSubtitle, selectSubtitleTimings } from "../subtitleSlice";
import GoToSecondButton from "./GoToSecondButton";

interface Time {
  start: number;
  end: number;
}

interface TopToolbarProps {
  readOnly: boolean;
  id: number;
  time: Time;
  setTime(time: Partial<Time>): void;
}

function msToHMS(ms: number) {
  if (ms > 86399999) return "< 1 day";
  if (ms > 0) return new Date(ms).toISOString().slice(11, 21);
  else return "";
}

export default function TopToolbar(props: TopToolbarProps) {
  const dispatch = useAppDispatch();
  const subtitles = useAppSelector(
    selectSubtitleTimings,
    (oldState, newState) =>
      JSON.stringify(oldState) === JSON.stringify(newState)
  );
  const [error, setError] = useState({ start: false, end: false });

  useEffect(() => {
    function checkConflicts(time: number) {
      return subtitles.some(
        (subtitle) => subtitle.start_time < time && subtitle.end_time > time
      );
    }
    if (!props.readOnly) {
      if (props.time.end < props.time.start)
        setError({ start: true, end: true });
      else
        setError({
          start: checkConflicts(props.time.start),
          end: checkConflicts(props.time.end),
        });
    }
  }, [props.readOnly, props.time.end, props.time.start, subtitles]);

  const topToolbar = useMemo(
    () => (
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item xs={5} md={5} xl={5}>
          <TextField
            sx={{ width: "19ch", margin: 1 }}
            id="outlined-number"
            label={msToHMS(props.time.start)}
            type="number"
            error={error.start}
            defaultValue={props.time.start || 0}
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
                  id: props.id,
                })
              );
              props.setTime({ start: parseInt(event.target.value) });
            }}
          />
        </Grid>
        <Grid item xs={12} md={2} xl={2}>
          <Stack>
            <Typography variant="caption" sx={{ textAlign: "center" }}>
              {msToHMS(props.time.end - props.time.start)}
            </Typography>
            <GoToSecondButton
              ms={props.time.start || 0}
              readOnly={props.readOnly}
            />
          </Stack>
        </Grid>
        <Grid item xs={5} md={5} xl={5}>
          <TextField
            sx={{ width: "19ch", margin: 1 }}
            id="outlined-number"
            label={msToHMS(props.time.end)}
            type="number"
            error={error.end}
            defaultValue={props.time.end || 0}
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
                  id: props.id,
                })
              );
              props.setTime({ end: parseInt(event.target.value) });
            }}
          />
        </Grid>
      </Grid>
    ),
    [dispatch, error.end, error.start, props]
  );

  return <>{topToolbar}</>;
}
