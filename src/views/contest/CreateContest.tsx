import React from "react";
import { Typography } from "@material-ui/core";
import { useContext } from "react";
import { Context } from "../../store";
import { StepOne } from "./steps/StepOne";
import { StepTwo } from "./steps/StepTwo";
import { StepThree } from "./steps/StepThree";
import { StepFour } from "./steps/StepFour";
import { useBaseStyles } from "../../style";

const stepComponents = [StepOne, StepTwo, StepThree, StepFour];

export const CreateContest = React.memo(() => {
  const [state] = useContext(Context);
  const baseClasses = useBaseStyles();

  return (
    <div
      className={baseClasses.layout}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Typography color="textPrimary" variant="h4">
        Create a contest
      </Typography>

      {stepComponents.map((component, index) => {
        const StepComponent: any = component;
        return (
          <StepComponent
            key={index}
            style={{
              display: state.stepIndex !== index ? "none" : "block",
            }}
          />
        );
      })}
    </div>
  );
});
