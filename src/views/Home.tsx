import React from "react";
import { PollOption } from "../components/PollOption";
import { Context } from "../store";
import { useContext } from "react";


export const Home = React.memo(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_state, dispatch] = useContext(Context);

  return (
  <div>
    <div className="choose-poll-title valign-text-middle roboto-normal-white-36px">
      Choose an option
    </div>
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
