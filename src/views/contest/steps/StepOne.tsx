import React, { useEffect } from "react";
import { TextField, Typography } from "@material-ui/core";
import { useContext } from "react";
import { AppleStyleToggle } from "../../../components/AppleStyleToggle";
import { Context } from "../../../store";
import * as yup from "yup";
import { FormikValues, useFormik } from "formik";
import { ProgressBar } from "../../../components/StepProgress";
import { Prompt } from "react-router";

const validationSchema = yup.object({
  title: yup
    .string()
    .min(3, "Minimum length of 3 chars required")
    .max(60, "Title should be of max of 60 characters")
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
      allowImageLinks: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values: FormikValues) => {
      dispatch({
        type: "SET_CREATE_SETTINGS",
        payload: values,
      });
      dispatch({ type: "NEXT_STEP" });
    },
  });

  // load data test for edit
  useEffect(() => {
    if (!props.initialValues) {
      return;
    }
    
    formik.setValues(props.initialValues);
    formik.validateForm();
  }, [props.initialValues]);

  return (
    <form style={props.style} onSubmit={formik.handleSubmit}>
      <Prompt
        message="Are you sure you want to leave?"
      />

      <TextField
        color="secondary"
        required
        id="title"
        name="title"
        label="Title"
        value={formik.values.title}
        fullWidth
        inputProps={{ maxLength: 60 }}
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
        inputProps={{ maxLength: 2000 }}
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
      <ProgressBar numberOfSteps={3} onSubmit={formik.handleSubmit} />
    </form>
  );
});
