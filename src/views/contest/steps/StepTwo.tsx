import {
  Typography,
  Grid,
  Paper,
  makeStyles,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useContext } from "react";
import { Context } from "../../../store";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { withFormik } from "formik";
import * as yup from "yup";
import { UserData } from "../../../types/UserData";
import { useAuth } from "../../../hooks/useAuth";
import { ProgressBar } from "../../../components/StepProgress";

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
  const userData: UserData | null = useAuth();
  const classes = useStyles();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, dispatch] = useContext(Context);  
  const canProceed = props.isValid && props.dirty;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid item>
 
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <DateTimePicker
                fullWidth
                label="Start time"
                name="entryStart"
                disablePast
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
                disablePast
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
                    disabled={!userData}
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
                    disabled={!userData}
                    name="enterSubscribers"
                  />
                }
                label="Subscribers"
              />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography color="textPrimary" variant="h5">
                Entry format
              </Typography>

              <FormControlLabel
                style={{ width: "100%" }}
                control={
                  <Checkbox
                    color="primary"
                    checked={props.values.enterAnybody}
                    onChange={props.handleChange}
                    name="enterAnybody"
                  />
                }
                label="Exclude description from submissions"
              />
              <FormControlLabel
                style={{ width: "100%" }}
                control={
                  <Checkbox
                    color="primary"
                    checked={props.values.enterFollowers}
                    onChange={props.handleChange}
                    name="enterFollowers"
                  />
                }
                label="Allow images as imgur links"
              />
              <FormControlLabel
                style={{ width: "100%" }}
                control={
                  <Checkbox
                    color="primary"
                    checked={props.values.enterSubscribers}
                    onChange={props.handleChange}
                    name="enterSubscribers"
                  />
                }
                label="All for multple uploads"
              />
            </Paper>
          </Grid>

          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Typography color="textPrimary" variant="h5" gutterBottom>
                Voting Settings
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <DateTimePicker
                  fullWidth
                  label="Start time"
                  inputVariant="filled"
                  name="voteStart"
                  disablePast
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
                  disablePast
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
                  disabled={!userData}
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
                  disabled={!userData}
                  label="Subscribers"
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <ProgressBar
          numberOfSteps={4}
          canProceed={canProceed}
          onNext={() => {
            dispatch({ type: "SET_CREATE_SETTINGS", payload: props.values })
          }}
          onSubmit={props.handleSubmit}
        />
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
