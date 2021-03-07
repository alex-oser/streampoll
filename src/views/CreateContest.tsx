import { Button } from "@material-ui/core";
import { useContext } from "react";
import { Context } from "../store";
import { Skeleton } from "@material-ui/lab";
import { Box } from "@material-ui/core";


export const CreateContest = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_state, dispatch] = useContext(Context);

  return (
    <div style={{ width: 400, margin: 100}}>
      {/* TODO: remove this placeholder stuff */}
      <Box display="flex" flexDirection="column" alignItems="center">
        <Skeleton height="200" width="100%" />
        <Skeleton width="100%" />
        <Skeleton width="100%">
          <div style={{ paddingTop: '57%' }} />
        </Skeleton>
      </Box>
      <Button
        onClick={() => dispatch({ type: "SET_SECTION", payload: "home" })}
        variant="contained"
        color="primary"
      >
        Back
      </Button>
    </div>
  );
};
