import { makeStyles } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(() => ({
  skeletonSpacing: { margin: "12px 0 12px 0", padding: 0 },
}));

export const DankSkelli = () => {
  const classes = useStyles();

  return (
    <div style={{ marginTop: 50 }}>
      <Skeleton
        width={400}
        height={20}
        className={classes.skeletonSpacing}
      />
      <Skeleton
        width={400}
        height={200}
        variant="rect"
        style={{ margin: 0, padding: 0 }}
      />
      <Skeleton
        width={400}
        height={10}
        className={classes.skeletonSpacing}
      />
      <Skeleton
        width={400}
        height={10}
        className={classes.skeletonSpacing}
      />
      <Skeleton
        width={400}
        height={20}
        className={classes.skeletonSpacing}
      />
    </div>
  );
};
