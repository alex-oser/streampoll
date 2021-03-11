import React from "react";
import { Typography, Grid, makeStyles } from "@material-ui/core";
import { useContext } from "react";
import { Context } from "../../store";
import { StepOne } from "./steps/StepOne";
import { StepTwo } from "./steps/StepTwo";
import { StepThree } from "./steps/StepThree";
import { StepFour } from "./steps/StepFour";
import { useHistory } from "react-router";
import { useBaseStyles } from "../../style";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: 50,
    paddingBottom: 100,
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
}));

const stepComponents = [StepOne, StepTwo, StepThree, StepFour];

export const CreateContest = React.memo(() => {
  const [state, dispatch] = useContext(Context);
  const classes = useStyles();
  const history = useHistory();
  const baseClasses = useBaseStyles();

  const onValidationUpdate = (form: any) => {
    console.log("getting form updates");
    const canProceed = form.isValid && form.dirty;
    dispatch({ type: "SET_CAN_PROCEED", payload: canProceed });
  };

  const handleSubmitForm = () => {
    fetch("/api/create/contest", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state.createSettings),
    })
      .then((res) => res.json())
      .then((res) => {
        const id = res.id;
        dispatch({ type: "SET_SECTION", payload: "home" });
        dispatch({ type: "RESET_STEP" });
        history.push(`contest/${id}`);
      });
  };

  return (
    <Grid
      container
      className={baseClasses.layout}
      direction="column"
      justify="center"
    >
      {/* <Typography color="textPrimary" variant="h4">
        Create a contest
      </Typography> */}

      {stepComponents.map((component, index) => {
        const StepCompnent: any = component;
        return (
          <div
            key={index}
            style={{
              height: "100%",
              display: state.stepIndex !== index ? "none" : "block",
            }}
          >
            <StepCompnent
              onSubmitForm={handleSubmitForm}
              onValidationUpdate={onValidationUpdate}
            />
          </div>
        );
      })}
    </Grid>
  );
});
