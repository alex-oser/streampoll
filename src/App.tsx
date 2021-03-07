import { useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { LOGIN_URL } from "./util";
import { useAuth } from "./hooks/useAuth";
import { Home } from "./views/Home";
import { Profile } from "./views/Profile";
import { CreateContest } from "./views/CreateContest";
import { Context } from "./store";

import { UserData } from "./types/UserData";

const App = () => {
  const userData: UserData | null = useAuth();
  const [state] = useContext(Context);

  return (
    <Router>
      <div className="create-poll">
        <Header
          userData={userData}
          loginUrl={LOGIN_URL}
        />

        {state.section === "home" && (
          <>
            <Route path="/" exact>
              <Home />
            </Route>
            
            <Route path="/create/contest" exact>
              <CreateContest />
            </Route>

            <Route path="/profile">
              <Profile userData={userData} />
            </Route>
          </>
        )}

        {state.section === "contest" && (
          <CreateContest />
        )}

        <Footer />
      </div>
    </Router>
  );
};

export default App;
