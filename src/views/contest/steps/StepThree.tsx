import React, { useState } from "react";
import { TextField, Grid, CircularProgress } from "@material-ui/core";
import { useContext } from "react";

import { Context } from "../../../store";
import * as yup from "yup";
import { useFormik } from "formik";
import { ProgressBar } from "../../../components/StepProgress";

import IconCheck from "@material-ui/icons/CheckRounded";
import IconCross from "@material-ui/icons/Clear";
import { useBaseStyles } from "../../../style";

const validationSchema = yup.object({
  host: yup
    .string()
    .min(3, "Min length 3")
    .max(25, "Host should be of max of 255 characters")
    .required("Host is required"),
});

export const StepThree = React.memo((props: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const baseClasses = useBaseStyles();

  const [state, dispatch] = useContext(Context);
  const [isFetching, setIsFetching] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const formik = useFormik({
    initialValues: {
      host: "",
    },
    validateOnChange: false,
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  });

  const canProceed = formik.isValid && formik.dirty;
  const hasErrors = formik.getFieldMeta("host").error != null;

  const validateUsername = () => {
    // if errors make sure we fetch again next time
    if (hasErrors) {
      setHasFetched(false);
    }

    setIsFetching(true);

    fetch(`/api/twitch/user/${formik.values.host}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          formik.setFieldError("host", "User not found");
        }

        setIsFetching(false);
        setHasFetched(true);
      });
  };

  const getSpinner = () => {
    //: <IconCheck style={{ color: "green" }} />}
    // formik.getFieldMeta("host")

    if (isFetching && formik.values.host) {
      return <CircularProgress />;
    } else if (hasErrors) {
      return <IconCross style={{ color: "red" }} />;
    } else if (formik.values.host && hasFetched) {
      return <IconCheck style={{ color: "green" }} />;
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        color="secondary"
        required
        id="host"
        name="host"
        label="Host"
        value={formik.values.host}
        onBlur={(event) => {
          formik.handleBlur(event);
          validateUsername();
        }}
        onKeyDown={(event) => {
          if (event.code === "Enter") {
            formik.handleChange(event);
            validateUsername();
          }
        }}
        onChange={formik.handleChange}
        error={formik.touched.host && Boolean(formik.errors.host)}
        helperText={formik.touched.host && formik.errors.host}
      />
      {getSpinner()}

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
