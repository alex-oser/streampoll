import { makeStyles, Paper } from "@material-ui/core";
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { TabPanel } from "./TabPanel";

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const columns = [
  { id: 'title', label: 'Title', minWidth: 170 },
  {
    id: 'createdAt',
    label: 'Created At',
    minWidth: 100,
    align: 'right',
    format: (value: any) => (new Date(value * 1000)).toString()
  },
  { id: 'description', label: 'Description', minWidth: 170 },
];

export const MyPolls = (props: any) => {
  const classes = useStyles();
  const { value, index } = props;
  // const [ contests, setContests ] = useState([])
  const [rows, setRows] = useState<any>([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getContestData = (contests: any) => {
    var newRows: Array<any> = []
    var fetches: Array<any> = []
    contests.forEach((contest: any) => {
      fetches.push(
        fetch(`/api/contest/${contest.contestid}`, {
          credentials: "include",
        })
          .then((res) => res.json())
          .then((res) => {
            if (!res.error) {
              console.log("contest is: " + JSON.stringify(res))
              newRows.push(res)
            }
          })
      )
    })
    Promise.all(fetches).then(() => {
      setRows(newRows)
    })

  }

  useEffect(() => {
    fetch("/api/me/contests", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          getContestData(Object.values(res))
        }
      }
      );
  }, []);

  return (
    <>
      <TabPanel style={{ overflow: "auto", display: "flex", flexDirection: "column" }} value={value} index={index}>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column: any) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column: any) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
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