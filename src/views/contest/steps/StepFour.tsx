import React from "react";
import { Typography } from "@material-ui/core";
import { useContext } from "react";
import { Context } from "../../../store";
import { ProgressBar } from "../../../components/StepProgress";
import { useHistory } from "react-router";

export const StepFour = React.memo((props: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, dispatch] = useContext(Context);
  const history = useHistory();

  const handleSubmitForm = () => {
    fetch("/api/contest/create", {
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
        dispatch({ type: "RESET_STEP" });
        history.push(`contest/${id}`);
      });
  };
  
  return (
    <form style={props.style}>
      <Typography color="textPrimary" variant="h6">CONFIRM SCREEN</Typography>
      <ProgressBar
        numberOfSteps={4}
        canProceed
        onNext={() => {
          dispatch({ type: "SET_CREATE_SETTINGS", payload: props.values });
        }}
        onSubmit={handleSubmitForm}
      />
    </form>
  );
});
