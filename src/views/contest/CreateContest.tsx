import { useEffect } from "react";
import { Typography, Grid, makeStyles } from "@material-ui/core";
import { useContext } from "react";
import { ProgressBar } from "../../components/ProgressBar";
import { Context } from "../../store";
import { StepOne } from "./steps/StepOne";
import { StepThree } from "./steps/StepThree";
import { StepTwo } from "./steps/StepTwo";

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
  const classes = useStyles();

  // reset the step index
  useEffect(() => {
    return () => dispatch({ type: "RESET_STEP" });
  }, [dispatch]);

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
      <Grid container>
        <Typography color="textPrimary" variant="h4">
          Create a contest
        </Typography>

        <StepOne />
        <StepTwo />
        <StepThree />

        <ProgressBar
          numberOfSteps={4}
          canProceed={state.canProceed}
          onNext={() => {}}
          onSubmit={submitForm}
        />
      </Grid>
    </div>
  );
};
