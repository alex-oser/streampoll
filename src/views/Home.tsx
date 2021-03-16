import React from "react";
import { PollOption } from "../components/PollOption";
import { useBaseStyles } from "../style";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export const Home = React.memo(() => {
  const baseClasses = useBaseStyles();

  return (
    <div className={baseClasses.layout}>
      <Typography color="textPrimary" variant="h3">
        I want to create a...
      </Typography>

      <Link style={{ textDecoration: "none" }} to="/create/contest">
        <PollOption
          title="Contest"
          description="Contest with user submission and voting periods"
        />
      </Link>

      <PollOption
        title="Poll - coming soon™"
        description="Poll with admin created options of text/images"
        isActive={false}
      />

      <PollOption
        title="Giveaway - coming soon™"
        description="Create a giveaway with prizes"
        isActive={false}
      />
    </div>
  );
});
