import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserData } from "../types/UserData";
import { Context } from "../store";

type HeaderProps = {
  userData: UserData | null;
  loginUrl: string;
};

export const Header = ({ userData, loginUrl }: HeaderProps) => {
  const history = useHistory();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, dispatch] = useContext(Context);

  const handleRoute = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    dispatch({ type: "SET_SECTION", payload: "home" });
    history.push(path);
  };

  return (
    <div className="header">
      <a onClick={(e) => handleRoute(e, "/")} href="/">
        <img alt="streampoll-logo" src="/img/logo.svg" />
      </a>
      <div className="connect">
        {userData ? (
          <>
            <Link
              onClick={(e) => handleRoute(e, "/profile")}
              to="/profile"
              className="user-link roboto-normal-white-24px"
            >
              <img     
                alt="user-avatar"
                style={{ 
                  width: 32,
                  height: 32,
                  marginRight: 12
                }}
                src={userData.profile_image_url}
              />
              {userData.display_name}
            </Link>
            <a
              href="/api/logout"
              className="user-link roboto-normal-white-24px"
            >
              Log Out
            </a>
          </>
        ) : (
          <a className="user-link roboto-normal-white-24px" href={loginUrl}>
            <img
              className="twitch-login-icon"
              alt="twitch-logo"
              width="28px"
              height="28px"
              src="/img/twitch-logo.svg"
            />
            Log In
          </a>
        )}
      </div>
    </div>
  );
};
