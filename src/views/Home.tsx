import React from "react";
import { PollOption } from "../components/PollOption";
import { Context } from "../store";
import { useContext } from "react";
import { useBaseStyles } from "../style";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  main: {
    alignItems: "right",
    display: "flex",
    height: "44px",
    marginLeft: "auto",
    marginTop: "1px"
  },
}));

export const Home = React.memo(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_state, dispatch] = useContext(Context);
  const baseClasses = useBaseStyles();

  return (
  <div className={baseClasses.layout}>
    <Typography color="textPrimary" variant="h3">
      Choose an option
    </Typography>
    
    <PollOption
      title="Poll (coming soon...)"
      description="Poll with admin created options of text/images"
      isActive={false}
    />

    <PollOption
      onClick={() => dispatch({ type: "SET_SECTION", payload: "contest" })}
      style={{ cursor: "pointer" }}
      title="Contest"
      description="Contest with user submission and voting periods"
    />

    <PollOption
      title="Survey (coming soon...)"
      description="Create a survey and collect results"
      isActive={false}
    />
  </div>
)});
