import { makeStyles } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getContestById } from "../../service/contests";

import { CreateContest } from "./CreateContest";

const useStyles = makeStyles(() => ({
  skeletonSpacing: { margin: "12px 0 12px 0", padding: 0 },
}));

export const EditContest = (props: any) => {
  const params: any = useParams();
  const [initialValues, setInitialValues] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    // console.log(params, editMode);
    const fetchContests = async () => {
      const contest: any = await getContestById(params.id);
      setInitialValues(contest);
    };

    fetchContests();
  }, []);

  if (!initialValues) {
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
  }

  return (
    <CreateContest editMode={true} initialValues={initialValues} />
  );
};
