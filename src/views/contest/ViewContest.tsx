import { Grid, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "50%",
    height: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 50,
    marginBottom: 50,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

export const ViewContest = (props: any) => {
  const [contestData, setContestData] = useState({});
  const params: any = useParams();
  const classes = useStyles();
  console.log(props);

  useEffect(() => {
    fetch(`/api/contest/${params.id}`)
      .then(res => res.json())
      .then(res => {
        setContestData(res)
      })
  }, [params.id]);

  return (
    <Grid container className={classes.layout} direction="column" justify="center" >
      <pre style={{ color: "#fff" }}>{JSON.stringify(contestData, null, 2)}</pre>
    </Grid>
  );
};
