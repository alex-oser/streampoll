import {
  Typography,
  Grid,
  Paper,
  makeStyles,
  FormControlLabel,
  Checkbox,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { useContext } from "react";
import { Context } from "../../../store";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { useFormik } from "formik";
import * as yup from "yup";
import { UserData } from "../../../types/UserData";
import { useAuth } from "../../../hooks/useAuth";
import { ProgressBar } from "../../../components/StepProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    background: "none",
    border: "none",
    boxShadow: "none",
  },
}));

const validationSchema = yup.object({
  entryStart: yup
    .date()
    .nullable()
    .required("Entry Start Date/Time is required"),
  entryEnd: yup
    .date()
    .nullable()
    .required("Entry End Date/Time is required"),
  voteStart: yup
    .date()
    .nullable()
    .required("Vote Start Date/Time is required"),
  voteEnd: yup
    .date()
    .nullable()
    .required("Vote End Date/Time is required"),
  voteType: yup.string().required("Vote Type is required"),
});

export const StepTwo = (props: any) => {
  const userData: UserData | null = useAuth();
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      entryStart: new Date(),
      entryEnd: new Date(),
      voteStart: new Date(),
      voteEnd: new Date(),
      enterAnybody: true,
      enterSubcribers: false,
      enterFollowers: false,
      voteAnybody: true,
      voteSubscribers: false,
      voteFollowers: false,
      allowImageLinks: false,
      multipleUploads: false,
      enterSubscribers: false,
      excludeDescription: false,
      voteType: "upvote",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, dispatch] = useContext(Context);
  const canProceed = formik.isValid && formik.dirty;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography color="textPrimary" variant="h6">
              Entry Settings
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <DateTimePicker
              fullWidth
              label="Start time"
              name="entryStart"
              disablePast
              inputVariant="filled"
              value={formik.values.entryStart}
              onBlur={formik.handleBlur}
              onChange={(value) => {
                formik.setFieldValue("entryStart", value);
              }}
              error={
                formik.touched.entryStart &&
                Boolean(formik.errors.entryStart)
              }
              helperText={
                formik.touched.entryStart && formik.errors.entryStart
              }
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
              value={formik.values.entryEnd}
              onBlur={formik.handleBlur}
              onChange={(value) => {
                formik.setFieldValue("entryEnd", value);
                formik.setFieldValue("voteStart", value);
              }}
              error={
                formik.touched.entryEnd &&
                Boolean(formik.errors.entryEnd)
              }
              helperText={
                formik.touched.entryEnd && formik.errors.entryEnd
              }
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography color="textPrimary" variant="h6">
              Who can enter?
            </Typography>

            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={formik.values.enterAnybody}
                  onChange={formik.handleChange}
                  name="enterAnybody"
                />
              }
              label="Anybody"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={formik.values.enterFollowers}
                  onChange={formik.handleChange}
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
                  checked={formik.values.enterSubscribers}
                  onChange={formik.handleChange}
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
            <Typography color="textPrimary" variant="h6">
              Entry format
            </Typography>

            <FormControlLabel
              style={{ width: "100%" }}
              control={
                <Checkbox
                  color="primary"
                  checked={formik.values.excludeDescription}
                  onChange={formik.handleChange}
                  name="excludeDescription"
                />
              }
              label="Exclude description from submissions"
            />
            <FormControlLabel
              style={{ width: "100%" }}
              control={
                <Checkbox
                  color="primary"
                  checked={formik.values.allowImageLinks}
                  onChange={formik.handleChange}
                  name="allowImageLinks"
                />
              }
              label="Allow images as imgur links"
            />
            <FormControlLabel
              style={{ width: "100%" }}
              control={
                <Checkbox
                  color="primary"
                  checked={formik.values.multipleUploads}
                  onChange={formik.handleChange}
                  name="multipleUploads"
                />
              }
              label="All for multple uploads"
            />
          </Paper>
        </Grid>

        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography color="textPrimary" variant="h6">
                Voting Settings
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <DateTimePicker
                fullWidth
                label="Start time"
                inputVariant="filled"
                name="voteStart"
                disablePast
                value={formik.values.voteStart}
                onBlur={formik.handleBlur}
                onChange={(value) =>
                  formik.setFieldValue("voteStart", value)
                }
                error={
                  formik.touched.voteStart &&
                  Boolean(formik.errors.voteStart)
                }
                helperText={
                  formik.touched.voteStart && formik.errors.voteStart
                }
              />
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <DateTimePicker
                fullWidth
                label="End time"
                inputVariant="filled"
                name="voteEnd"
                disablePast
                value={formik.values.voteEnd}
                onBlur={formik.handleBlur}
                onChange={(value) =>
                  formik.setFieldValue("voteEnd", value)
                }
                error={
                  formik.touched.voteEnd &&
                  Boolean(formik.errors.voteEnd)
                }
                helperText={
                  formik.touched.voteEnd && formik.errors.voteEnd
                }
              />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography color="textPrimary" variant="h6">
                Who can vote?
              </Typography>

              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={formik.values.voteAnybody}
                    onChange={formik.handleChange}
                    name="voteAnybody"
                  />
                }
                label="Anybody"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={formik.values.voteFollowers}
                    onChange={formik.handleChange}
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
                    checked={formik.values.voteSubscribers}
                    onChange={formik.handleChange}
                    name="voteSubscribers"
                  />
                }
                disabled={!userData}
                label="Subscribers"
              />
            </Paper>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <FormControl>
                  <InputLabel htmlFor="voting-type">
                    Voting Type
                  </InputLabel>
                  <Select
                    style={{ width: 160 }}
                    value={formik.values.voteType}
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.voteType &&
                      Boolean(formik.errors.voteType)
                    }
                    inputProps={{
                      name: "voteType",
                      id: "voting-type",
                    }}
                  >
                    <MenuItem value="upvoteDownvote">
                      Upvote/Downvote
                    </MenuItem>
                    <MenuItem value="upvote">Upvote</MenuItem>
                  </Select>
                </FormControl>
              </Paper>
            </Grid>
          </Grid>
          <ProgressBar
          numberOfSteps={4}
          canProceed={canProceed}
          onNext={() => {
            dispatch({
              type: "SET_CREATE_SETTINGS",
              payload: formik.values,
            });
          }}
          onSubmit={formik.handleSubmit}
        />
        </Grid>
  
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

// export const StepTwo = withFormik({
//   mapPropsToValues: () => ({
//     entryStart: new Date(),
//     entryEnd: new Date(),
//     voteStart: new Date(),
//     voteEnd: new Date(),
//     enterAnybody: true,
//     enterSubcribers: false,
//     enterFollowers: false,
//     voteAnybody: true,
//     voteSubcribers: false,
//     voteFollowers: false,
//     allowImageLinks: false,
//     multipleUploads: false,
//     excludeDescription: false,
//     voteType: "upvote",
//   }),
//   validateOnMount: true,
//   validationSchema: yup.object({
//     entryStart: yup
//       .date()
//       .nullable()
//       .required("Entry Start Date/Time is required"),
//     entryEnd: yup.date().nullable().required("Entry End Date/Time is required"),
//     voteStart: yup
//       .date()
//       .nullable()
//       .required("Vote Start Date/Time is required"),
//     voteEnd: yup.date().nullable().required("Vote End Date/Time is required"),
//     voteType: yup.string().required("Vote Type is required"),
//   }),
//   handleSubmit: (values, { setSubmitting }) => {},

//   displayName: "BasicForm",
// })(StepBase);
