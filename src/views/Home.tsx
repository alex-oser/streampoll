import { PollOption } from "../components/PollOption";
export const Home = () => (
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
      onClick={() => {}}
      title="CONTEST"
      description="Contest with user submission and voting periods"
    />

    <PollOption
      title="SURVEY (coming soon...)"
      description="Create a survey and collect results"
      isActive={false}
    />
  </div>
);
