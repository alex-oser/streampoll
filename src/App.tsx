import { useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { LOGIN_URL } from "./util";
import { useAuth } from "./hooks/useAuth";
import { Home } from "./views/Home";
import { Profile } from "./views/profile/Profile";
import { CreateContest } from "./views/contest/CreateContest";
import { Context } from "./store";

import { UserData } from "./types/UserData";
import { ViewContest } from "./views/contest/ViewContest";
import { EnterContest } from "./views/contest/EnterContest";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  createPoll: {
    alignItems: "center",
    background: theme.palette.secondary.main,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100%",
    "&. autoFlex": {
     
    }
  }
}));


const App = () => {
  const userData: UserData | null = useAuth();
  const [state] = useContext(Context);
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.createPoll}>
        <Header userData={userData} loginUrl={LOGIN_URL} />

        {state.section === "home" && (
          <>
            <Route path="/" exact>
              <Home />
            </Route>

            <Route path="/create/contest">
              <CreateContest />
            </Route>

            <Route exact path="/contest/:id">
              <ViewContest />
            </Route>
            <Route exact path="/contest/:id/enter">
              <EnterContest />
            </Route>

            <Route path="/profile">
              <Profile userData={userData} />
            </Route>
          </>
        )}

        {state.section === "contest" && <CreateContest />}

        <Footer />
      </div>
    </Router>
  );
};

export default App;
