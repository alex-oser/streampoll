import { BrowserRouter as Router, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { LOGIN_URL } from "./util";
import { useAuth } from "./hooks/useAuth";
import { Home } from "./views/Home";
import { Profile } from "./views/Profile";
import { CreateContest } from "./views/CreateContest";

import { useState } from "react";

const App = () => {
  const userData = useAuth();
  const [section, setSection] = useState("home");

  return (
    <>
      <Router>
        <div className="create-poll">
          <Header userData={userData} loginUrl={LOGIN_URL} />

          {section === "home" && (
            <>
              <Route path="/" exact>
                  <Home />
              </Route>
              <Route path="/profile">
                <Profile userData={userData}/>
              </Route>
            </>
          )}

          <p onClick={() => setSection("create") }>test</p>  
          {section === "create" && <CreateContest props={setSection}></CreateContest>}

          <Footer />
        </div>
      </Router>
    </>
  );
};

export default App;
