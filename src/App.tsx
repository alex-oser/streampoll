import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { nanoid } from "nanoid";

const callbackUrl =
  window.location.protocol +
  "//" +
  window.location.host +
  "/api/oauth/callback";

const { REACT_APP_BUILD_INFO, REACT_APP_CLIENT_ID } = process.env;

function App() {
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
        if (!res.error) {
          setUserData(res)
        }
      });
  }, []);

  return (
    <Router>
      <div className="Login">
        <pre>{loginUrl}</pre>
        <pre>{JSON.stringify(userData)}</pre>

        {userData ? (
          <a href="/api/logout">LOG OUT</a>
        ) : (
          <a href={loginUrl}>LOGIN</a>
        )}

        <h1>{REACT_APP_BUILD_INFO}</h1>
      </div>
    </Router>
  );
}

export default App;
