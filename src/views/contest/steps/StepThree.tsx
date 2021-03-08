import {
  Typography,
  Grid,
} from "@material-ui/core";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../../store";
import { ContestSettings } from "../../../types/ContestSettings";

export const StepThree = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, dispatch] = useContext(Context);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [contest, setContest] = useState<ContestSettings | null>(null);
  
  useEffect(() => {
    dispatch({ type: "SET_CREATE_SETTINGS", payload: contest});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.stepIndex]);

  return (
    <Grid container >
      <Grid item xs={12}>
        <Typography color="textPrimary" variant="h5">
          Step three
        </Typography>      

      </Grid>

    </Grid>
  );
};
