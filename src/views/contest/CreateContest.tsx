import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import { useContext } from "react";
import { Context } from "../../store";
import { StepOne } from "./steps/StepOne";
import { StepTwo } from "./steps/StepTwo";
import { StepThree } from "./steps/StepThree";
import { StepFour } from "./steps/StepFour";
import { useBaseStyles } from "../../style";
import { Prompt } from "react-router";

const stepComponents = [StepOne, StepTwo, StepThree, StepFour];

const getStyle = (isActive: Boolean) => {
  if (isActive) {
    return {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    };
  } else {
    return { display: "none" };
  }
};

export const CreateContest = React.memo(() => {
  const [state, dispatch] = useContext(Context);
  const baseClasses = useBaseStyles();

  const beforeUnloadListener = (event: any) => {
    event.preventDefault();
    return event.returnValue = "Are you sure you want to exit?";
  };

  // reset step on comp unmount
  useEffect(() => {

    window.addEventListener("beforeunload", beforeUnloadListener, {
      capture: true,
    });

    return () => {
      dispatch({ type: "RESET_STEP" });
      window.removeEventListener("beforeunload", beforeUnloadListener, {capture: true});
    };
  }, []);

  return (
    <div
      className={baseClasses.layout}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Prompt message="Are you sure you want to leave?"/>
      <Typography
        color="textPrimary"
        variant="h4"
        style={{ paddingBottom: 20 }}
      >
        Create a contest
      </Typography>

      {stepComponents.map((component, index) => {
        const StepComponent: any = component;
        return (
          <StepComponent
            key={index}
            style={getStyle(state.stepIndex === index)}
          />
        );
      })}
    </div>
  );
});
