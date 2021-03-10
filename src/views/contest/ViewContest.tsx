import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const ViewContest = (props: any) => {
  const [contestData, setContestData] = useState({});
  const params: any = useParams();
  console.log(props);

  useEffect(() => {
    fetch(`/api/contest/${params.id}`)
    .then(res => res.json())
    .then(res => {
      setContestData(res)
    })
  }, [params.id]);

  return (
    <Grid container direction="column" justify="center" >
      <pre style={{ color: "#fff" }}>{JSON.stringify(contestData, null, 2)}</pre>
    </Grid>
  );
};
