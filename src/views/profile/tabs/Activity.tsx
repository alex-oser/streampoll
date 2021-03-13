import {
  Chip,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useEffect } from "react";
import { useState } from "react";
import { TabPanel } from "./TabPanel";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

// const ActiveButton = withStyles((theme) => ({
//   root: {
//     // color: theme.palette.getContrastText(purple[500]),
//     backgroundColor: "#80C687",
//   },
// }))(Button);

export const Activity = (props: any) => {
  const classes = useStyles();
  const { value, index } = props;
  const [rows, setRows] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const history = useHistory();

  const handleEdit = (contestId: string, entryId: string) => {
    history.push(`/contest/${contestId}/entry/${entryId}/edit`);
  };

  const getContestStatus = (contest: any) => {
    const currDate = new Date();
    const entryStart = new Date(contest.entryStart);
    const entryEnd = new Date(contest.entryEnd);
    const voteStart = new Date(contest.voteStart);
    const voteEnd = new Date(contest.voteEnd);
    if (currDate < contest.entryStart) {
      return ["#FDBB3C", "Coming Up"];
    } else if (entryStart < currDate && currDate < entryEnd) {
      return ["#80C687", "Entry Open"];
    } else if (voteStart < currDate && currDate < voteEnd) {
      return ["#80C687", "Voting Open"];
    } else {
      return ["#FD615A", "Closed"];
    }
  };

  const columns = [
    {
      id: "title",
      label: "Contest",
      style: { minWidth: 100, verticalAlign: "top" },
      format: (row: any) => (
        <div style={{ display: "flex" }}>
          <img
            src={row.contest.hostProfileImageUrl}
            style={{ height: 100 }}
            alt="contest host"
          />
          <IconButton
            onClick={() => {
              handleEdit(row.contest.id, row.entry.id);
            }}
          >
            <EditIcon />
          </IconButton>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6">
              Hosted by {row.contest.host}
            </Typography>
            <Typography variant="subtitle1">
              {row.entry.title}
            </Typography>
            <Typography variant="subtitle2">
              {row.entry.description.substr(0, 255)}
            </Typography>
          </div>
        </div>
      ),
    },
    {
      id: "createdAt",
      label: "Submission Time",
      style: { minWidth: 100, verticalAlign: "top" },
      align: "right",
      format: (row: any) =>
        new Date(row.entry.createdAt).toLocaleDateString("en-US"),
    },
    {
      id: "status",
      label: "Status",
      style: { minWidth: 100, verticalAlign: "top" },
      align: "right",
      format: (row: any) => {
        const [backgroundColor, label] = getContestStatus(
          row.contest
        );
        return (
          <Chip
            style={{ backgroundColor: backgroundColor }}
            label={label}
          />
        );
      },
    },
  ];

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getEntriesData = (entries: any) => {
    fetch("/api/entry/list", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entries),
    })
      .then((res) => res.json())
      .then((res) => {
        setRows(res);
      });
  };

  // On page load fetch contests the authenticated user has created
  useEffect(() => {
    fetch("/api/me/entries", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          const entries = res;
          getEntriesData(entries);
        }
      });
  }, []);

  return (
    <>
      <TabPanel
        style={{
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
        value={value}
        index={index}
      >
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column: any) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={column.style}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  .map((row: any, index: number) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={"row" + index}
                      >
                        {columns.map((column: any) => {
                          return (
                            <TableCell
                              key={column.id + "-" + index}
                              align={column.align}
                              style={column.style}
                            >
                              {column.format(row)}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </TabPanel>
    </>
  );
};
