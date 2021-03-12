import { useState } from "react";
import {
  InputAdornment,
  CircularProgress,
  InputLabel,
} from "@material-ui/core";
import { useContext } from "react";

import { Context } from "../../../store";
import * as yup from "yup";
import { useFormik } from "formik";
import { ProgressBar } from "../../../components/StepProgress";
import IconCheck from "@material-ui/icons/CheckRounded";
import IconCross from "@material-ui/icons/Clear";
import {
  FormControl,
  FormHelperText,
  OutlinedInput,
} from "@material-ui/core";

const validationSchema = yup.object({
  host: yup
    .string()
    .min(3, "Min length 3")
    .max(25, "Host should be of max of 255 characters")
    .required("Host is required"),
});

export const StepThree = (props: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, dispatch] = useContext(Context);
  const [isFetching, setIsFetching] = useState(false);

  const formik = useFormik({
    initialValues: {
      host: "",
    },
    validateOnChange: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  });

  const canProceed = formik.isValid && formik.dirty;
  const hasErrors = formik.getFieldMeta("host").error != null;

  const validateUsername = () => {
    // if errors make sure we fetch again next time
    if (!formik.isValid || !formik.values.host) {
      return;
    }
    setIsFetching(true);
    fetch(`/api/twitch/user/${formik.values.host}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          formik.setFieldError("host", "User not found");
        }
        setIsFetching(false);
      });
  };

  const getSpinner = () => {
    if (isFetching && formik.values.host) {
      return <CircularProgress />;
    } else if (hasErrors) {
      return <IconCross style={{ color: "red" }} />;
    } else if (formik.values.host && formik.isValid) {
      return <IconCheck style={{ color: "green" }} />;
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} style={props.style}>
      <FormControl variant="outlined">
        <InputLabel htmlFor="host">Host</InputLabel>
        <OutlinedInput
          color="secondary"
          required
          id="host"
          name="host"
          label="Host"
          style={{ width: "50%" }}
          value={formik.values.host}
          onBlur={(event) => {
            formik.handleBlur(event);
            validateUsername();
          }}
          onKeyDown={(event) => {
            if (formik.isValid && event.code === "Enter") {
              formik.handleChange(event);
              validateUsername();
            }
          }}
          onChange={formik.handleChange}
          endAdornment={
            <InputAdornment position="end">
              <>{getSpinner()}</>
            </InputAdornment>
          }
          aria-describedby="outlined-host-helper-text"
          inputProps={{
            "aria-label": "host",
          }}
          labelWidth={0}
          error={formik.touched.host && Boolean(formik.errors.host)}
        />
        <FormHelperText id="outlined-host-helper-text">
          {formik.touched.host && formik.errors.host}
        </FormHelperText>
      </FormControl>

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
};
