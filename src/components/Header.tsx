import { Link } from "react-router-dom";

export const Header = (props: any) => {
  const { userData, loginUrl } = props;
  return (
    <div className="header">
      <Link to="/">
        <img alt="streampoll-logo" src="/img/logo.svg" />
      </Link>
      <div className="connect">
        {userData ? (
          <>
            <Link className="user-link roboto-normal-white-24px" to="/profile">{userData.display_name}</Link>
            <a className="user-link roboto-normal-white-24px" href="/api/logout">Log Out</a>
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
