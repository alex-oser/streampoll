import {
  Typography,
  Grid,
  Paper,
  makeStyles,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useContext, useEffect } from "react";
import { Context } from "../../../store";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { withFormik } from "formik";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    background: "none",
    border: "none",
    boxShadow: "none",
  },
}));

export const StepBase = (props: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, dispatch] = useContext(Context);
  // const [contest, setContest] = useState<ContestSettings>({});
  const classes = useStyles();

  useEffect(() => {
    const canProceed = props.isValid && props.dirty;
    dispatch({ type: "SET_CAN_PROCEED", payload: canProceed });
    console.log("PROPS", props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isValid, props.dirty]);

  useEffect(() => {
    dispatch({ type: "SET_CREATE_SETTINGS", payload: props.fields });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.stepIndex]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid style={{ display: state.stepIndex !== 1 ? "none" : "block" }} item>
        <Typography color="textPrimary" variant="h5" gutterBottom>
          Entry Settings
        </Typography>

        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <DateTimePicker
                fullWidth
                label="Start time"
                name="entryStart"
                defaultValue={null}
                inputVariant="filled"
                value={props.values.entryStart}
                onBlur={props.handleBlur}
                onChange={(value) => {
                  props.setFieldValue("entryStart", value);
                  props.setFieldValue("voteStart", value);
                }}
                error={
                  props.touched.entryStart && Boolean(props.errors.entryStart)
                }
                helperText={props.touched.entryStart && props.errors.entryStart}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <DateTimePicker
                fullWidth
                label="End time"
                inputVariant="filled"
                name="entryEnd"
                value={props.values.entryEnd}
                onBlur={props.handleBlur}
                onChange={(value) => {
                  props.setFieldValue("entryEnd", value);
                  props.setFieldValue("voteEnd", value);
                }}
                error={props.touched.entryEnd && Boolean(props.errors.entryEnd)}
                helperText={props.touched.entryEnd && props.errors.entryEnd}
              />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography color="textPrimary" variant="h5">
                Who can enter?
              </Typography>

              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={props.values.enterAnybody}
                    onChange={props.handleChange}
                    name="enterAnybody"
                  />
                }
                label="Anybody"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={props.values.enterFollowers}
                    onChange={props.handleChange}
                    name="enterFollowers"
                  />
                }
                label="Followers"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={props.values.enterSubscribers}
                    onChange={props.handleChange}
                    name="enterSubscribers"
                  />
                }
                label="Subscribers"
              />
            </Paper>
          </Grid>

          <Grid container spacing={0}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <DateTimePicker
                  fullWidth
                  label="Start time"
                  inputVariant="filled"
                  name="voteStart"
                  value={props.values.voteStart}
                  onBlur={props.handleBlur}
                  onChange={(value) => props.setFieldValue("voteStart", value)}
                  error={
                    props.touched.voteStart && Boolean(props.errors.voteStart)
                  }
                  helperText={props.touched.voteStart && props.errors.voteStart}
                />
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <DateTimePicker
                  fullWidth
                  label="Start time"
                  inputVariant="filled"
                  name="voteEnd"
                  value={props.values.voteEnd}
                  onBlur={props.handleBlur}
                  onChange={(value) => props.setFieldValue("voteEnd", value)}
                  error={props.touched.voteEnd && Boolean(props.errors.voteEnd)}
                  helperText={props.touched.voteEnd && props.errors.voteEnd}
                />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography color="textPrimary" variant="h5">
                  Who can vote?
                </Typography>

                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={props.values.voteAnybody}
                      onChange={props.handleChange}
                      name="voteAnybody"
                    />
                  }
                  label="Anybody"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={props.values.voteFollowers}
                      onChange={props.handleChange}
                      name="voteFollowers"
                    />
                  }
                  label="Followers"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={props.values.voteSubscribers}
                      onChange={props.handleChange}
                      name="voteSubscribers"
                    />
                  }
                  label="Subscribers"
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export const StepTwo = withFormik({
  mapPropsToValues: () => ({
    entryStart: null,
    entryEnd: null,
    voteStart: null,
    voteEnd: null,
    enterAnybody: true,
    enterSubcribers: false,
    enterFollowers: false,
    voteAnybody: true,
    voteSubcribers: false,
    voteFollowers: false,
  }),
  validateOnMount: true,
  isInitialValid: false,
  validationSchema: yup.object({
    entryStart: yup
      .date()
      .nullable()
      .required("Entry Start Date/Time is required"),
    entryEnd: yup.date().nullable().required("Entry End Date/Time is required"),
    voteStart: yup
      .date()
      .nullable()
      .required("Vote Start Date/Time is required"),
    voteEnd: yup.date().nullable().required("Vote End Date/Time is required"),
  }),
  handleSubmit: (values, { setSubmitting }) => {},

  displayName: "BasicForm",
})(StepBase);
