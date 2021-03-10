import { Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useLocation } from "react-router";

export const ViewContest = () => {
  const location = useLocation();

  return (
    <Grid container direction="column" justify="center" >
      <pre>{JSON.stringify(location)}</pre>
      <Skeleton variant="text" width={600} />
      <Skeleton variant="text" width={500} />
      <Skeleton variant="text" width={350} />
      <Skeleton variant="rect" width={600} height={250} />
      <Skeleton variant="text" width={600} />
      <Skeleton variant="text" width={650} />
      <Skeleton variant="text" width={350} />
    </Grid>
  );
};
