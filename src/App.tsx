import { useEffect, useState } from "react";

import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { nanoid } from "nanoid";
import { useHistory } from "react-router-dom";

const callbackUrl =
  window.location.protocol +
  "//" +
  window.location.host +
  "/api/oauth/callback";

const { REACT_APP_BUILD_INFO, REACT_APP_CLIENT_ID } = process.env;

const App = () => {
  const [userData, setUserData] = useState(null);
  const state = nanoid(22);

  const paramsMap: any = {
    client_id: REACT_APP_CLIENT_ID,
    redirect_uri: callbackUrl,
    response_type: "code",
    state: state,
    scope: "user:read:email",
  };
  const params: any = Object.keys(paramsMap)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(paramsMap[k]))
    .join("&");

  const loginUrl = `https://id.twitch.tv/oauth2/authorize?${params}`;

  useEffect(() => {
    fetch("/api/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("response is " + JSON.stringify(res));
        if (!res.error) {
          setUserData(res);
        }
      });
  }, []);

  return (
    <>
      <Router>
        <div className="create-poll">
          <Header userData={userData} loginUrl={loginUrl} />
          <Route path="/" exact>
            <CreatePollOptions
              basicPollProps={null}
              contestProps={null}
              surveyProps={null}
            />
          </Route>
          <pre style={{ position: "fixed", bottom: 20, color: "#fff " }}>
            {REACT_APP_BUILD_INFO}
          </pre>
        </div>
      </Router>
    </>
  );
};

const CreatePollOptions = (props: any) => {
  const history = useHistory();
  const handleClick = () => history.push("/test");

  return (
    <div>
      <div className="choose-poll-title valign-text-middle roboto-normal-white-36px">
        Choose an option
      </div>
      <PollOption
        title="POLL (coming soon...)"
        description="Poll with admin created options of text/images"
        isActive={false}
      />

      <PollOption
        onClick={handleClick}
        title="CONTEST"
        description="Contest with user submission and voting periods"
      />

      <PollOption
        title="SURVEY (coming soon...)"
        description="Create a survey and collect results"
        isActive={false}
      />
    </div>
  );
};

const Header = (props: any) => {
  const { userData, loginUrl } = props;
  return (
    <div className="header">
      <Link to="/">
        <img alt="streampoll-logo" src="/img/logo.svg" />
      </Link>
      <div className="connect">
        {userData ? (
          <a className="user-link roboto-normal-white-36px" href="/api/logout">
            {userData.display_name}
          </a>
        ) : (
          <a className="user-link roboto-normal-white-36px" href={loginUrl}>
            <img className="twitch-login-icon" alt="twitch-logo" src="/img/twitch-logo.svg" />
            Log In
          </a>
        )}
      </div>
    </div>
  );
};

const PollOption = (props: any) => {
  const { title, description, isActive = true } = props;

  return (
    <div
      onClick={props.onClick}
      className={
        "poll-option-inactive " +
        (isActive === true ? "poll-option-active" : "")
      }
    >
      <div
        className={
          isActive === true
            ? "poll-option-active-accent"
            : "poll-option-inactive-accent"
        }
      ></div>
      <div className="auto-flex">
        <div
          className={
            "poll-option-title-i12 valign-text-middle " +
            (isActive === true
              ? "roboto-normal-white-24px"
              : "roboto-normal-storm-dust-24px")
          }
        >
          {title}
        </div>
        <div
          className={
            "poll-option-text-i12 valign-text-middle " +
            (isActive === true
              ? "roboto-normal-white-18px"
              : "roboto-normal-storm-dust-18px")
          }
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export default App;
