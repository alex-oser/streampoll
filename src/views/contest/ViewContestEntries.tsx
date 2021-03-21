import { Paper, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { DankSkelli } from "../../components/DankSkelli";
import { getEntriesById } from "../../service/contests";
import { useBaseStyles } from "../../style";
import ShareIcon from '@material-ui/icons/Share';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { ContestSettings } from "../../types/ContestSettings";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  link: {
    "textDecoration": "none",
    "fontWeight": "bold",
    "display": "flex",
    "color": theme.palette.primary.contrastText,
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer"
    },
  },
}));

export const ViewContestEntries = (props: any) => {
  const [allEntries, setAllEntries] = useState<any>();
  const baseClasses = useBaseStyles();
  const [contestData,setContestData] = useState<ContestSettings | null>(null);
  const params: any = useParams();
  const classes = useStyles();
  const { contestId } = params;
  useEffect(() => {
    getEntriesById(contestId).then((res: any) =>
      setAllEntries(res)
    );
  }, []);

  useEffect(() => {
    fetch(`/api/contest/${contestId}`)
      .then((res) => res.json())
      .then((res) => {
        setContestData(res);
      });
  }, []);

  if (!allEntries) {
    return <DankSkelli />;
  }

  return (
    <div className={baseClasses.layout}>
      <Link className={classes.link} to={`/contest/${contestId}`}>
        <Typography variant="h4">{contestData?.title || "Loading..."}</Typography>
      </Link>
      <div style={{ height: "100%", width: "100%", overflow: "hidden" }}>
        <div style={{ height: "100%", width: "100%", overflow: "auto", paddingRight: 17, boxSizing: "content-box" }}>
        {allEntries.map((entry: any) => (
          <Paper key={entry.entryId} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 15, padding: 10 }}>
            <Typography variant="h5">{entry.title}</Typography>
            <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>{entry.description}</Typography>
            <img src={entry.url} alt="imgur" style={{ maxHeight: 400, maxWidth: 400, objectFit: "contain" }}/> 
            <div style={{ display: "flex" }}>
              <FavoriteBorderIcon /> <ShareIcon />
            </div>
          </Paper>
        ))}
        </div>
      </div>
    </div>
  );
};
