import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./style.css";

const { REACT_APP_COMMIT_SHA = "kappa" } = process.env;

const COLOR_STATES: any = {
  "queued": "#e3b341",
  "in_progress": "#e3b341",
  "completed": "#56d364",
}

const useStyles = makeStyles({
  chip: {
    borderRadius: "50%",
    width: 12,
    height: 12,
    marginRight: 6,
  },
});

const TinyLittleGuyWhoHasAReallyLongComponentNameDontYouWorryBud = ({ style }: { style: any }) => {
  const classes = useStyles();
  return <div style={style} className={classes.chip} />;
};

export const Footer = () => {
  const build = REACT_APP_COMMIT_SHA.substr(-7);
  const [buildState, setBuildState] = useState<any>("completed");

  useEffect(() => {
    fetch("/api/build/status")
    .then(res => res.json())
    .then(res => {
      setBuildState(res);
    });
  }, []);

  return (
    <div style={{ display: "flex" }} className="footer">
      <TinyLittleGuyWhoHasAReallyLongComponentNameDontYouWorryBud style={{ background: COLOR_STATES[buildState.status ]}} />
      <div>{build}</div>
    </div>
  );
};
