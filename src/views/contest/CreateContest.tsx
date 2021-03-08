import React, { useEffect, useState } from "react";
import { Typography, Grid, makeStyles } from "@material-ui/core";
import { useContext } from "react";
import { ProgressBar } from "../../components/ProgressBar";
import { Context } from "../../store";
import { StepOne } from "./steps/StepOne";
import { StepThree } from "./steps/StepThree";
import { StepTwo } from "./steps/StepTwo";
import { Formik } from "formik";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: 50,
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
}));

export const CreateContest = () => {
  const [state, dispatch] = useContext(Context);
  const [canProceed, setCanProceed] = useState(false);
  const classes = useStyles();

  // reset the step index
  useEffect(() => {
    return () => dispatch({ type: "RESET_STEP" });
  }, [dispatch]);

  const onFormValidate = (form: any) => {
    setCanProceed(form.isValid && form.dirty);
  };

  const submitForm = () => {
    fetch("/api/create/contest", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state.createSettings),
    });
  };

  return (
    <div className={classes.layout}>
      <Grid container spacing={3}>
        <Typography color="textPrimary" variant="h4">
          Create a contest
        </Typography>

        <Formik
          initialValues={{
            title: "",
            description: "",
            allowImageLinks: true,
          }}
          validateOnMount
          validateOnChange
          onSubmit={() => {}}
          validationSchema={yup.object({
            title: yup.string()
            .min(3, "min req")
            .max(255, "Description should be of max of 255 characters")
            .required("Title is required"),
            description: yup
              .string()
              .min(5, "Description should be at least 5 characters")
              .max(1000, "Description should be of max of 1000 characters")
              .required("Description is required"),
          })}
        >
          {(props) => <StepOne onFormValidate={onFormValidate} {...props} />}
        </Formik>
        <StepTwo />
        <StepThree />

        <ProgressBar
          numberOfSteps={4}
          canProceed={canProceed}
          onNext={() => {}}
          onSubmit={submitForm}
        />
      </Grid>
    </div>
  );
};
