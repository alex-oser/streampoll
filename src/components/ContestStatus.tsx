import { Chip } from "@material-ui/core";

export const ContestStatus = ({ contest }: { contest: any }) => {
  const currDate = new Date();
  const entryStart = new Date(contest.entryStart);
  const entryEnd = new Date(contest.entryEnd);
  const voteStart = new Date(contest.voteStart);
  const voteEnd = new Date(contest.voteEnd);
  let backgroundColor;
  let label;
  if (currDate < entryStart) {
    backgroundColor = "#FDBB3C";
    label = "Coming Up";
  } else if (entryStart < currDate && currDate < entryEnd) {
    backgroundColor = "#80C687";
    label = "Entry Open";
  } else if (voteStart < currDate && currDate < voteEnd) {
    backgroundColor = "#80C687";
    label = "Voting Open";
  } else {
    backgroundColor = "#FD615A";
    label = "Closed";
  }
  return (
    <Chip
      style={{ backgroundColor: backgroundColor }}
      label={label}
    />
  );
};
