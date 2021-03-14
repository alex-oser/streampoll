import React from "react";
import { PollOption } from "../components/PollOption";
import { Context } from "../store";
import { useContext } from "react";
import { useBaseStyles } from "../style";
import { Typography } from "@material-ui/core";

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
        onClick={() =>
          dispatch({ type: "SET_SECTION", payload: "contest" })
        }
        style={{ cursor: "pointer" }}
        title="Contest"
        description="Contest with user submission and voting periods"
      />

      <PollOption
        title="Poll (coming soon...)"
        description="Poll with admin created options of text/images"
        isActive={false}
      />

      <PollOption
        title="Survey (coming soon...)"
        description="Create a survey and collect results"
        isActive={false}
      />

      <PollOption
        title="Giveaways (coming soon...)"
        description="Create a giveaway with prizes"
        isActive={false}
      />
    </div>
  );
});
