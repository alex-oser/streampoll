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
        console.log("response is " + JSON.stringify(res))
        if (!res.error) {
          setUserData(res)
        }
      });
  }, []);

  return (
    <Router>
      <div className="create-poll">
        <Header vector={CreatePollData.headerProps.vector} logoProps={CreatePollData.headerProps.logoProps} userData={userData} loginUrl={loginUrl} />
        <div style={{wordBreak: "break-word"}}>{loginUrl}</div>
        <pre>{JSON.stringify(userData)}</pre>
        <h1>{REACT_APP_BUILD_INFO}</h1>
        <CreatePollOptions
          basicPollProps={CreatePollData.basicPollData}
          contestProps={CreatePollData.contestData}
          surveyProps={CreatePollData.surveyData}
        />
      </div>
    </Router>
  );
}

const CreatePollOptions = (props: any) => {
  const { basicPollProps, contestProps, surveyProps } = props;

  return (
    <div>
      <div className="choose-poll-title valign-text-middle roboto-normal-white-36px">Choose an option</div>
      <PollOption
        title={basicPollProps.title}
        description={basicPollProps.description}
        isActive={false}
      />
      <PollOption
        title={contestProps.title}
        description={contestProps.description}
      />
      <PollOption
        title={surveyProps.title}
        description={surveyProps.description}
        isActive={false}
      />
    </div>
      );
}


const Header = (props: any) => {
  const { vector, logoProps, userData, loginUrl } = props;
  console.log("login url is " + loginUrl)
  return (
    <div className="header">
      <Logo
        ellipse3={logoProps.ellipse3}
        ellipse4={logoProps.ellipse4}
        ellipse5={logoProps.ellipse5}
        logonameI6961069={logoProps.logonameI6961069}
      />
      <div className="connect">
        <img alt="nopers" className="vector" src={vector} />
        <div className="text-1 valign-text-middle roboto-normal-white-36px">
          { userData ? (
            <a href="/api/logout">hi {userData.display_name}</a>
          ) : (
            <a href={loginUrl}>LOGIN</a>
          )}
        </div>
      </div>
    </div>
  );
}


const Logo = (props: any) => {
  const { ellipse3, ellipse4, ellipse5, logonameI6961069 } = props;

  return (
    <div className="logo">
      <div className="overlap-group">
        <img alt="nopers" className="ellipse-3" src={ellipse3} />
        <img alt="nopers" className="ellipse-" src={ellipse4} />
        <img alt="nopers" className="ellipse-" src={ellipse5} />
      </div>
      <h1 className="logo-name-i6961069 valign-text-middle roboto-normal-white-36px">{logonameI6961069}</h1>
    </div>
  );
}


const PollOption = (props: any) => {
  const { title, description, isActive = true } = props;

  return (
    <div className={"poll-option-inactive " + (isActive === true ? "poll-option-active" : "")}>
      <div className={isActive === true ? "poll-option-active-accent" : "poll-option-inactive-accent"}></div>
      <div className="auto-flex">
        <div className={"poll-option-title-i12 valign-text-middle " + (isActive === true ? "roboto-normal-white-24px" : "roboto-normal-storm-dust-24px")}>
          {title}
        </div>
        <div className={"poll-option-text-i12 valign-text-middle " + (isActive === true ? "roboto-normal-white-18px" : "roboto-normal-storm-dust-18px")}>
          {description}
        </div>
      </div>
    </div>
  );
}

const logoData = {
    ellipse3: "https://anima-uploads.s3.amazonaws.com/projects/6043f71a550d896f1a967344/releases/6043f79a8cf12c0a1acfc6db/img/ellipse-3@2x.svg",
    ellipse4: "https://anima-uploads.s3.amazonaws.com/projects/6043f71a550d896f1a967344/releases/6043f79a8cf12c0a1acfc6db/img/ellipse-3@2x.svg",
    ellipse5: "https://anima-uploads.s3.amazonaws.com/projects/6043f71a550d896f1a967344/releases/6043f79a8cf12c0a1acfc6db/img/ellipse-3@2x.svg",
    logonameI6961069: "streampoll",
};

const headerData = {
    vector: "https://anima-uploads.s3.amazonaws.com/projects/6043f71a550d896f1a967344/releases/6043f79a8cf12c0a1acfc6db/img/vector@2x.svg",
    text1: "connect",
    logoProps: logoData,
};

const basicPollData = {
    title: "POLL (coming soon...)",
    description: "Poll with admin created options of text/images",
};

const contestData = {
    title: "CONTEST",
    description: "Contest with user submission and voting periods",
};

const surveyData = {
    title: "SURVEY (coming soon...)",
    description: "Create a survey and collect results",
};

const CreatePollData = {
    headerProps: headerData,
    basicPollData,
    contestData,
    surveyData,
};

export default App;