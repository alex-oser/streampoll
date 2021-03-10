import React from "react";
import { TextField, Typography, Grid } from "@material-ui/core";
import { useContext } from "react";
import { AppleStyleToggle } from "../../../components/AppleStyleToggle";
import { Context } from "../../../store";
import * as yup from "yup";
import { withFormik } from "formik";
import { ProgressBar } from "../../../components/StepProgress";

const StepBase = React.memo((props: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, dispatch] = useContext(Context);
  const canProceed = props.isValid && props.dirty;

  return (
    <form onSubmit={props.handleSubmit}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <TextField
            color="secondary"
            required
            id="title"
            name="title"
            label="Title"
            value={props.values.title}
            fullWidth
            onBlur={props.handleBlur}
            onChange={props.handleChange}
            error={props.touched.title && Boolean(props.errors.title)}
            helperText={props.touched.title && props.errors.title}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            color="secondary"
            required
            multiline
            rows="6"
            id="description"
            name="description"
            label="Description"
            fullWidth
            value={props.values.description}
            onBlur={props.handleBlur}
            onChange={props.handleChange}
            error={
              props.touched.description && Boolean(props.errors.description)
            }
            helperText={props.touched.description && props.errors.description}
          />
        </Grid>

        <Grid item xs={12}>
          <div style={{ flex: 1 }}>
            <AppleStyleToggle
              name="allowImageLinks"
              onChange={props.handleChange}
              checked={props.values.allowImageLinks}
            />
            <Typography color="textPrimary" variant="h6">
              Photo Contest
            </Typography>
            <Typography color="textPrimary" variant="body2">
              Selecting photo contest will require each submission to have an
              image.
            </Typography>
          </div>
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
    </form>
  );
});

export const StepOne = withFormik({
  mapPropsToValues: () => ({
    title: "",
    description: "",
    allowImageLinks: true,
  }),
  validateOnChange: true,
  validateOnMount: false,
  validateOnBlur: false,
  validationSchema: yup.object({
    title: yup
      .string()
      .min(3, "min req")
      .max(255, "Description should be of max of 255 characters")
      .required("Title is required"),
    description: yup
      .string()
      .min(5, "Description should be at least 5 characters")
      .max(1000, "Description should be of max of 1000 characters")
      .required("Description is required"),
  }),
  handleSubmit: (values, { setSubmitting }) => {
    console.log("form submitted");
  },

  displayName: "BasicForm",
})(StepBase);
