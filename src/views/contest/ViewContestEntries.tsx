import { IconButton, Paper, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { DankSkelli } from "../../components/DankSkelli";
import {
  getContestById,
  getEntriesByContest,
  handleVote,
} from "../../service/contests";
import { getMyVotes } from "../../service/users";
import { useBaseStyles } from "../../style";
import ShareIcon from "@material-ui/icons/Share";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { ContestSettings } from "../../types/ContestSettings";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  liked: {
    color: "#9c30ff",
  },
  notLiked: {
    color: "#8e8e8e",
  }
}));

export const ViewContestEntries = (props: any) => {
  const [entries, setEntries] = useState<any>();
  const [votes, setVotes] = useState<any>({});
  const [voted, setVoted] = useState(false);
  const baseClasses = useBaseStyles();
  const classes = useStyles();
  const [
    contestData,
    setContestData,
  ] = useState<ContestSettings | null>(null);
  const params: any = useParams();
  const { contestId } = params;

  useEffect(() => {
    getEntriesByContest(contestId).then((res: any) =>
      setEntries(res)
    );
    getContestById(contestId).then((res: any) => 
      setContestData(res)
    );
  }, []);

  useEffect(() => {
    getMyVotes(contestId).then((res: any) => {
      setVotes(res)
    });
  }, [voted])

  if (!entries) {
    return <DankSkelli />;
  }

  return (
    <div className={baseClasses.layout}>
      <Link className={baseClasses.link} to={`/contest/${contestId}`}>
        <Typography variant="h4">
          {contestData?.title || "Loading..."}
        </Typography>
      </Link>
      <div
        style={{ height: "100%", width: "100%", overflow: "hidden" }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            overflow: "auto",
            paddingRight: 17,
            boxSizing: "content-box",
          }}
        >
          {entries.map((entry: any) => (
            <Paper
              key={entry.entryId}
              style={{ marginBottom: 15, padding: 10 }}
            >
              <Link
                className={baseClasses.link}
                to={`/contest/${contestId}/entry/${entry.entryId}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">{entry.title}</Typography>
                <Typography
                  variant="body2"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {entry.description}
                </Typography>
                <img
                  src={entry.url}
                  alt="imgur"
                  style={{
                    maxHeight: 400,
                    maxWidth: 400,
                    objectFit: "contain",
                  }}
                />
                <Typography variant="body2">
                  Created by {entry.createdByName}
                </Typography>
                </Link>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <IconButton
                    onClick={() => {
                      handleVote(contestId, entry.entryId);
                      setVoted(!voted);
                    }}
                  >
                    <ThumbUpIcon 
                      className={ entry.entryId in votes ? classes.liked : classes.notLiked }
                    />
                  </IconButton>
                  <IconButton
                    disabled
                  >
                    <ShareIcon />
                  </IconButton>
                </div>
            </Paper>
          ))}
        </div>
      </div>
    </div>
  );
};
