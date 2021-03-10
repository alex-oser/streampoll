import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { useContext } from "react";
import { Context } from "../../../store";
import { ProgressBar } from "../../../components/StepProgress";

export const StepFour = React.memo((props: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, dispatch] = useContext(Context);

  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Typography color="textPrimary" variant="h6">CONFIRM SCREEN</Typography>
      </Grid>
      <ProgressBar
        numberOfSteps={4}
        canProceed
        onNext={() => {
          dispatch({ type: "SET_CREATE_SETTINGS", payload: props.values });
        }}
        onSubmit={props.onSubmitForm}
      />
    </Grid>
  );
});
