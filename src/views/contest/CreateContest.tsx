import { useEffect } from "react";
import { Typography } from "@material-ui/core";
import { useContext } from "react";
import { Context } from "../../store";
import { StepOne } from "./steps/StepOne";
import { StepTwo } from "./steps/StepTwo";
import { StepThree } from "./steps/StepThree";
import { useBaseStyles } from "../../style";
import { useHistory, useParams } from "react-router";
import { createContest, updateContest } from "../../service/contests";

const stepComponents = [StepOne, StepTwo, StepThree];

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

export const CreateContest = ({
  initialValues,
  editMode = false,
}: {
  initialValues?: any;
  editMode?: boolean;
}) => {
  const [state, dispatch] = useContext(Context);
  const baseClasses = useBaseStyles();
  const history = useHistory();
  const params: any = useParams();

  const beforeUnloadListener = (event: any) => {
    if (state.stepIndex === 3) {
      return;
    }

    event.preventDefault();
    return (event.returnValue = "Are you sure you want to exit?");
  };

  // reset step on comp unmount
  useEffect(() => {
    window.addEventListener("beforeunload", beforeUnloadListener, {
      capture: true,
    });
    
    return () => {
      dispatch({ type: "RESET_STEP" });
      dispatch({ type: "RESET_CREATE_SETTINGS" });

      window.removeEventListener(
        "beforeunload",
        beforeUnloadListener,
        { capture: true }
      );
    };
  }, []);

  const handleSubmitForm = async (settings: any) => {
    let id;
    if (editMode) {
      id = params.id;
      await updateContest(id, settings);
    } else {
      id = await createContest(settings);
    }

    history.push(`/contest/${id}`);
  };

  return (
    <div
      className={baseClasses.layout}
      style={{ display: "flex", flexDirection: "column" }}
    >
      {/* <Prompt
        message="Are you sure you want to leave?"
      /> */}

      <Typography
        color="textPrimary"
        variant="h4"
        style={{ paddingBottom: 20 }}
      >
        {editMode ? "Edit Contest" : "Create a contest"}
      </Typography>

      {stepComponents.map((component, index) => {
        const StepComponent: any = component;
        return (
          <StepComponent
            initialValues={initialValues}
            key={index}
            onSubmit={(values: any) => handleSubmitForm(values)}
            style={getStyle(state.stepIndex === index)}
          />
        );
      })}
    </div>
  );
};
