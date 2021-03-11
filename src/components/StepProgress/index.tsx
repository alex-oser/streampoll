import { Button, darken, makeStyles } from "@material-ui/core";
import { useContext } from "react";
import { Context } from "../../store";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    marginTop: "auto",
    width: "100%",
  },
  dotGroup: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  dot: {
    marginRight: 12,
    justifyContent: "space-evenly",
    borderRadius: "50%",
    width: 12,
    height: 12,
    background: darken(theme.palette.secondary.light, 0.6),
  },
  activeDot: {
    background: theme.palette.secondary.light,
  },
}));

export const ProgressDots = ({
  stepIndex,
  numberOfSteps,
}: {
  numberOfSteps: number;
  stepIndex: number;
}) => {
  const classes = useStyles();
  const progresItems = [...Array(numberOfSteps)];

  const addActiveClass = (index: number) => {
    return index === stepIndex ? classes.activeDot : "";
  };

  return (
    <>
      {progresItems.map((value, index) => (
        <div
          key={index}
          className={classNames(classes.dot, addActiveClass(index))}
        />
      ))}
    </>
  );
};

type ProgressBarProps = {
  numberOfSteps: number;
  onSubmit: Function;
  onNext: Function;
  canProceed: boolean;
};

export const ProgressBar = ({
  numberOfSteps,
  onSubmit,
  onNext,
  canProceed,
}: ProgressBarProps) => {
  const classes = useStyles();
  const [state, dispatch] = useContext(Context);
  const isLastStep = state.stepIndex === numberOfSteps - 1;

  const handleNext = () => {
    if (isLastStep) {
      return onSubmit();
    }

    onNext();

    dispatch({ type: "NEXT_STEP" });
  };

  const handlePrev = () => {
    dispatch({ type: "PREV_STEP" });
  };

  return (
    <div className={classes.container}>
      <Button
        style={{
          visibility: state.stepIndex !== 0 ? "visible" :  "hidden",
        }}
        onClick={handlePrev}
        variant="contained"
        color="primary"
        disabled={state.stepIndex === 0}
      >
        Back
      </Button>

      <div className={classes.dotGroup}>
        <ProgressDots
          numberOfSteps={numberOfSteps}
          stepIndex={state.stepIndex}
        />
      </div>
      <Button
        onClick={handleNext}
        variant="contained"
        color="primary"
        disabled={!canProceed}
      >
        {isLastStep ? "Submit" : "Next"}
      </Button>
    </div>
  );
};
