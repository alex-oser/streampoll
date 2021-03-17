import { Paper, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { DankSkelli } from "../../components/DankSkelli";
import { getEntriesById } from "../../service/contests";
import { useBaseStyles } from "../../style";

export const ViewContestEntries = (props: any) => {
  const [allEntries, setAllEntries] = useState<any>();
  const baseClasses = useBaseStyles();

  const params: any = useParams();
  useEffect(() => {
    getEntriesById(params.contestId).then((res: any) =>
      setAllEntries(res)
    );
  }, []);

  if (!allEntries) {
    return <DankSkelli />;
  }

  return (
    <div className={baseClasses.layout}>
      <Typography variant="h4">ALL ENTRIES </Typography>
      {allEntries.map((entry: any) => (
        <Paper key={entry.entryId}>
          <Typography variant="h5">{entry.title}</Typography>
          <Typography variant="body2">{entry.description}</Typography>    
        </Paper>
      ))}
    </div>
  );
};
