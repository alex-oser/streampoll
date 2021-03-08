import {
  TextField,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../../store";
import { ContestSettings } from "../../../types/ContestSettings";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib

export const StepTwo = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, dispatch] = useContext(Context);
  const [contest, setContest] = useState<ContestSettings>({});

  useEffect(() => {
    dispatch({ type: "SET_CREATE_SETTINGS", payload: contest});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.stepIndex]);

  return (
    <Grid style={{ display: state.stepIndex !== 1 ? "none" : "block" }} container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Typography color="textPrimary" variant="h5">
          Entry Settings
        </Typography>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            label="Start time"
            inputVariant="outlined"
            value={contest.entryStart}
            onChange={(date) => setContest({ ...contest, entryStart: date || new Date()})}
          />
          <DateTimePicker
            label="End time"
            inputVariant="outlined"
            value={contest.entryEnd}
            onChange={(date) => setContest({ ...contest, entryEnd: date || new Date()})}
          />
        </MuiPickersUtilsProvider>
        <TextField
          id="datetime-local"
          label="Start time"
          type="datetime-local"
          defaultValue={new Date()}
          InputLabelProps={{
            shrink: true,
          }}
          // onChange={(e) => setContest({...contest, entryEnd: e.target.value})}
        />
      </Grid>

      <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedB}
            // onChange={() => {}}
            name="checkedB"
            color="primary"
          />
        }
        color="contrastText"
        label="test"
        classes={{ 
          label: '#fff'
        }}
      />

    </Grid>
  );
};
