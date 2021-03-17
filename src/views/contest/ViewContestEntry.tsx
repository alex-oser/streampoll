import { Button, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { DankSkelli } from "../../components/DankSkelli";
import { useBaseStyles } from "../../style";

export const ViewContestEntry = (props: any) => {
  const [entryData, setEntryData] = useState<any>();
  const baseClasses = useBaseStyles();

  const params: any = useParams();
  useEffect(() => {
    fetch(
      `/api/contest/${params.contestId}/entry/${params.entryId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setEntryData(res);
      });
  }, []);

  const handleUpvote = () => {
    fetch(`/api/contest/${params.contestId}/${params.entryId}/vote`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  if (!entryData) {
    return <DankSkelli />;
  }

  return (
    <div className={baseClasses.layout}>
      <Typography variant="h5">{entryData.title}</Typography>
      <Typography variant="body2">{entryData.description}</Typography>
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
        onClick={handleUpvote}
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
