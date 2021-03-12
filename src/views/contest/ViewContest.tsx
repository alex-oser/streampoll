import { Button, makeStyles, Paper, Typography } from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ContestSettings } from "../../types/ContestSettings"
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  layout: {
    height: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 50,
    marginBottom: 50,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    [theme.breakpoints.down('sm')]: {
      width: "80%",
    },
    [theme.breakpoints.up('md')]: {
      width: "60%",
    },
    [theme.breakpoints.up('lg')]: {
      width: "40%",
    },
  },
  paper: {
    padding: theme.spacing(2),
    background: "none",
    border: "none",
    boxShadow: "none",
  }
}));

const initialState: ContestSettings = {}

export const ViewContest = (props: any) => {
  const [contestData, setContestData] = useState<ContestSettings>(initialState);
  const [hasEntered, setHasEntered] = useState(true);
  const params: any = useParams();
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    fetch(`/api/contest/${params.id}`)
      .then(res => res.json())
      .then(res => {
        setContestData(res)
      })
  }, [params.id]);

  useEffect(() => {
    fetch(`/api/me/entries`)
      .then(res => res.json())
      .then(res => {
        setHasEntered(
          res.some((entry: any) =>
            entry.contestid === params.id
          )
        )
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enterContest = (() => {
    // if (hasEntered) {
    //   console.log("you already have entered this contest")
    //   return
    // }
    history.push(`/contest/${params.id}/enter`);
  })

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.layout} 
      // flexDirection="column" justify="center"
      >
        <Typography style={{ alignSelf: "center", paddingBottom: 20 }} color="textPrimary" variant="h4">
          {contestData.title}
        </Typography>
        <Typography color="textPrimary" variant="h5">
          Contest Description
        </Typography>
        <Typography color="textPrimary" style={{ paddingBottom: 20 }} variant="h6">
          {contestData.description}
        </Typography>
        <Typography color="textPrimary" variant="h5">
          Entry Period
        </Typography>
        <div style={{ display: "flex" }}>
          <Paper className={classes.paper}>
            <DateTimePicker
              fullWidth
              label="Start time"
              inputVariant="filled"
              name="entryStart"
              disabled
              value={contestData.entryStart}
              onChange={() => { }}
            />
          </Paper>
          <Paper className={classes.paper}>
            <DateTimePicker
              fullWidth
              label="End time"
              inputVariant="filled"
              name="entryEnd"
              disabled
              value={contestData.entryEnd}
              onChange={() => { }}
            />
          </Paper>
        </div>
        <Typography color="textPrimary" variant="h5">
          Voting Period
        </Typography>
        <div style={{ display: "flex" }}>
          <Paper className={classes.paper}>
            <DateTimePicker
              fullWidth
              label="Start time"
              inputVariant="filled"
              name="voteStart"
              disabled
              value={contestData.voteStart}
              onChange={() => { }}
            />
          </Paper>
          <Paper className={classes.paper}>
            <DateTimePicker
              fullWidth
              label="End time"
              inputVariant="filled"
              name="voteStart"
              disabled
              value={contestData.voteEnd}
              onChange={() => { }}
            />
          </Paper>
        </div>
        <Paper className={classes.paper} style={{ marginTop: "auto" }}>
          {hasEntered ?
            <Typography color="textPrimary" variant="h6">
              You have already entered this contest.
            </Typography>
            : null
          }
          <Button
            onClick={() => enterContest()}
            variant="contained"
            color="primary"
            // disabled={hasEntered}
            style={{ display: "flex", margin: "auto" }}
          >
            <Typography color="textPrimary" variant="h5">
              Enter Contest
            </Typography>
          </Button>
        </Paper>
      </div>
    </MuiPickersUtilsProvider>
  );
};
