import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { useContext } from "react";

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
            id="host"
            name="host"
            label="Host"
            value={props.values.host}
            fullWidth
            onBlur={props.handleBlur}
            onChange={props.handleChange}
            error={props.touched.host && Boolean(props.errors.host)}
            helperText={props.touched.host && props.errors.host}
          />
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

export const StepThree = withFormik({
  mapPropsToValues: () => ({
    title: "",
    description: "",
    allowImageLinks: true,
  }),
  validateOnChange: true,
  validateOnMount: false,
  validateOnBlur: false,
  validationSchema: yup.object({
    host: yup
      .string()
      .min(3, "min req")
      .max(255, "Host should be of max of 255 characters")
      .required("Host is required"),
  }),
  handleSubmit: (values, { setSubmitting }) => {
    console.log("form submitted");
  },

  displayName: "BasicForm",
})(StepBase);
