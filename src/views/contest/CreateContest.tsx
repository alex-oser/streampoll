import {
  TextField,
  Tooltip,
  Typography,
  Grid,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useContext, useState } from "react";
import { AppleStyleToggle } from "../../components/AppleStyleToggle";
import { ProgressBar } from "../../components/ProgressBar";
import { Context } from "../../store";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: 50,
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
}));

export const CreateContest = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_state, dispatch] = useContext(Context);
  const [isPhotoContest, setIsPhotoContest] = useState(true);
  const [contestTitle, setContestTitle] = useState("");
  const [contestDescription, setContestDescription] = useState("");
  

  const classes = useStyles();

  const submitForm = () => {
    fetch("/api/create/contest", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: contestTitle,
        description: contestDescription,
      }),
    });
  };

  return (
    <div className={classes.layout}>
      <Grid container spacing={3}>
        <Typography color="textPrimary" variant="h4">
          Create a contest
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              color="secondary"
              required
              id="title"
              name="title"
              label="Title"
              fullWidth
              onChange={(e) => setContestTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              color="secondary"
              required
              multiline
              rows="6"
              id="desc"
              name="desc"
              label="Description"
              fullWidth
              onChange={(e) => setContestDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <AppleStyleToggle
              onChange={(e) => setIsPhotoContest(e.target.checked)}
              checked={isPhotoContest}
            />
            <Typography color="textPrimary" variant="h5">
              Photo Contest
            </Typography>
            <Typography color="textPrimary" variant="h6">
              Selecting photo contest will require each submission to have an image.
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {/* <Button
        // onClick={() => dispatch({ type: "SET_SECTION", payload: "home" })}
        onClick={submitForm}
        variant="contained"
        color="primary"
      >
        CREATE TEST
      </Button> */}

      <ProgressBar numberOfSteps={3} />
    </div>
  );
};
