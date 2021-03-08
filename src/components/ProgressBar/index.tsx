import { Button, makeStyles } from "@material-ui/core";
import { useContext } from "react";
import { Context } from "../../store";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "fixed",
    display: "flex",
    bottom: 60,
  },
  dotGroup: {
    width: 500,
    display: "flex",
    justifyContent: "center",
  },
  dot: {
    marginRight: 12,
    justifyContent: "space-evenly",
    borderRadius: "50%",
    width: 12,
    height: 12,
    background: "#fff",
  },
  activeDot: {
    background: theme.palette.primary.main
  }
}));

export const ProgressDots = ({ stepIndex, numberOfSteps }: { numberOfSteps: number, stepIndex: number }) => {
  const classes = useStyles();
  const progresItems = [...Array(numberOfSteps)];


  const addActiveClass = (index: number) => {
    return (index === stepIndex ? classes.activeDot : "");
  }
  
  return (
    <>      
      {progresItems.map((value, index) => 
        <div key={index} className={classNames(classes.dot, addActiveClass(index))} />)
      }
    </>
  )
};

export const ProgressBar = ({ numberOfSteps }: { numberOfSteps: number }) => {
  const classes = useStyles();
  const [state, dispatch] = useContext(Context);

  const handleNext = () => {  
    dispatch({ type: "NEXT_STEP" })
  }

  const handlePrev = () => {
    dispatch({ type: "PREV_STEP" })
  }

  return (
    <div className={classes.container}>
      <Button
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
      >
        Next
      </Button>
    </div>
  );
};
