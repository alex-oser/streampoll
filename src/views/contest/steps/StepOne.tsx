import React from "react";
import { TextField, Typography, Grid } from "@material-ui/core";
import { useContext } from "react";
import { AppleStyleToggle } from "../../../components/AppleStyleToggle";
import { Context } from "../../../store";
import * as yup from "yup";
import { useFormik } from "formik";
import { ProgressBar } from "../../../components/StepProgress";

const validationSchema = yup.object({
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
});

export const StepOne = React.memo((props: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, dispatch] = useContext(Context);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      allowImageLinks: true,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  });

  const canProceed = formik.isValid && formik.dirty;

  return (
    <form style={{ height: "100%" }} onSubmit={formik.handleSubmit}>
      <TextField
        color="secondary"
        required
        id="title"
        name="title"
        label="Title"
        value={formik.values.title}
        fullWidth
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />

      <TextField
        color="secondary"
        required
        multiline
        rows="6"
        id="description"
        name="description"
        label="Description"
        fullWidth
        value={formik.values.description}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        error={
          formik.touched.description &&
          Boolean(formik.errors.description)
        }
        helperText={
          formik.touched.description && formik.errors.description
        }
      />

      <AppleStyleToggle
        name="allowImageLinks"
        onChange={formik.handleChange}
        checked={formik.values.allowImageLinks}
      />
      <Typography color="textPrimary" variant="h6">
        Photo Contest
      </Typography>
      <Typography color="textPrimary" variant="body2">
        Selecting photo contest will require each submission to have
        an image.
      </Typography>

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
    </form>
  );
});
