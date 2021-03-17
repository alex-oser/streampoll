import { BrowserRouter as Router, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { LOGIN_URL } from "./util";
import { useAuth } from "./hooks/useAuth";
import { Home } from "./views/Home";
import { Profile } from "./views/profile/Profile";
import { CreateContest } from "./views/contest/CreateContest";

import { UserData } from "./types/UserData";
import { ViewContest } from "./views/contest/ViewContest";
import { NewContestEntry } from "./views/contest/NewContestEntry";
import { EditContestEntry } from "./views/contest/EditContestEntry";
import { makeStyles } from "@material-ui/core";
import { EditContest } from "./views/contest/EditContest";
// import { usePrompt } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  createPoll: {
    alignItems: "center",
    background: theme.palette.background.default,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100%",
    "&. autoFlex": {},
  },
}));

const App = () => {
  const userData: UserData | null = useAuth();
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.createPoll}>
        <Header userData={userData} loginUrl={LOGIN_URL} />

        <Route path="/" exact>
          <Home />
        </Route>

        <Route exact path="/create/contest">
          <CreateContest />
        </Route>

        <Route exact path="/contest/:id/edit">
          <EditContest />
        </Route>

        <Route exact path="/contest/:id">
          <ViewContest />
        </Route>

        <Route exact path="/contest/:id/enter">
          <NewContestEntry />
        </Route>

        <Route exact path="/contest/:contestId/entry/:entryId/edit">
          <EditContestEntry />
        </Route>

        <Route path="/profile">
          <Profile />
        </Route>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
