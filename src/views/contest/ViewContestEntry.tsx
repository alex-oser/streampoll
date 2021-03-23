import { Button, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { DankSkelli } from "../../components/DankSkelli";
import { useBaseStyles } from "../../style";
import { getContestById, getEntryById, handleVote } from "../../service/contests";
import { Link } from "react-router-dom";

export const ViewContestEntry = (props: any) => {
  const [entryData, setEntryData] = useState<any>();
  const [contestData, setContestData] = useState<any>();
  const baseClasses = useBaseStyles();
  const params: any = useParams();
  const { contestId, entryId } = params;

  const fetchContest = async () => {
    const contest: any = await getContestById(contestId);
    setContestData(contest);
  };

  const fetchEntry = async () => {
    const entry: any = await getEntryById(contestId, entryId);
    setEntryData(entry);
  };

  useEffect(() => {
    fetchContest();
    fetchEntry();
  }, []);

  if (!entryData) {
    return <DankSkelli />;
  }

  return (
    <div className={baseClasses.layout}>
      <Link className={baseClasses.link} to={`/contest/${contestId}/entries`}>
        <Typography variant="h4">{contestData?.title}</Typography>
      </Link>
      <Typography variant="h5">{entryData?.title}</Typography>
      <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>{entryData.description}</Typography>
      {entryData?.url && (
        <div
          style={{
            height: "100%",
            backgroundImage: `url(${entryData.url})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        />
      )}

      <Typography variant="h5">
        Created by {entryData.username}
      </Typography>
      <Typography> {entryData.voteCount || 0} Votes</Typography>
      <Button
        onClick={() => handleVote(contestId, entryId)}
        variant="contained"
        color="primary"
        style={{ display: "flex", margin: "auto" }}
      >
        <Typography color="textPrimary" variant="h5">
          Upvote
        </Typography>
      </Button>
    </div>
  );
};
