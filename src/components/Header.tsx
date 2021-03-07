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

  const handleHome = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: "SET_SECTION", payload: "home" });
    history.push("/");
  };

  return (
    <div className="header">
      <a onClick={(e) => handleHome(e)} href="/">
        <img alt="streampoll-logo" src="/img/logo.svg" />
      </a>
      <div className="connect">
        {userData ? (
          <>
            <Link
              // onClick={(e) => handleHome(e)}
              to="/profile"
              className="user-link roboto-normal-white-24px"
            >
              {userData.display_name}
            </Link>
            <a
              onClick={(e) => handleHome(e)}
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
