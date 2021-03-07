import { PollOption } from "../components/PollOption";
import { Context } from "../store";
import { useContext } from "react";


export const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_state, dispatch] = useContext(Context);

  return (
  <div>
    <div className="choose-poll-title valign-text-middle roboto-normal-white-36px">
      Choose an option
    </div>
    <PollOption
      title="POLL (coming soon...)"
      description="Poll with admin created options of text/images"
      isActive={false}
    />

    <PollOption
      onClick={() => dispatch({ type: "SET_SECTION", payload: "contest" })}
      title="CONTEST"
      description="Contest with user submission and voting periods"
    />

    <PollOption
      title="SURVEY (coming soon...)"
      description="Create a survey and collect results"
      isActive={false}
    />
  </div>
)};
