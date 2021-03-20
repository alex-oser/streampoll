import {
  IconButton,
  makeStyles,
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
import Skeleton from "@material-ui/lab/Skeleton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useEffect } from "react";
import { useState } from "react";
import { TabPanel } from "./TabPanel";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    fontWeight: "bold",
    color: theme.palette.primary.contrastText,
  },
}));

export const Polls = (props: any) => {
  const { value, index } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const height = 69;
  const classes = useStyles();
  const [rows, setRows] = useState<any>([
    {
      title: <Skeleton height={height} />,
      description: <Skeleton height={height} />,
      createdAt: <Skeleton height={height} />,
    },
    {
      title: <Skeleton height={height} />,
      description: <Skeleton height={height} />,
      createdAt: <Skeleton height={height} />,
    },
    {
      title: <Skeleton height={height} />,
      description: <Skeleton height={height} />,
      createdAt: <Skeleton height={height} />,
    },
  ]);

  const getMyContests = () => {
    fetch("/api/me/contests", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          const contestIds = res;
          getContestsData(contestIds);
        }
      });
  };
  const getContestsData = (contests: any) => {
    fetch("/api/contest/list", {
      method: "POST",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contests),
    })
      .then((res) => res.json())
      .then((res) => {
        setRows(res);
      });
  };

  // On page load fetch contests the authenticated user has created
  useEffect(() => {
    getMyContests();
  }, []);

  const handleDelete = (contestId: string) => {
    fetch(`/api/contest/${contestId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => getMyContests());
  };

  const columns = [
    {
      id: "title",
      label: "Title",
      style: { minWidth: 100, maxWidth: 400, verticalAlign: "top" },
      format: (row: any) => (
        <div style={{ display: "flex" }}>
          <img
            src={row.hostProfileImageUrl}
            style={{ height: 100, paddingRight: 16 }}
            alt="contest host"
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Link className={classes.link} to={`/contest/${row.id}`}>
              <Typography variant="h6">{row.title}</Typography>
            </Link>
            <Typography
              variant="subtitle2"
              style={{ whiteSpace: "pre-line" }}
            >
              {row.description.substr(0, 255)}
            </Typography>
            {/* <Typography variant="body2">Hosted by {row.host}</Typography> */}
          </div>
        </div>
      ),
    },
    {
      id: "entryCount",
      label: "# of Entries",
      style: { minWidth: 100, verticalAlign: "top" },
      align: "right",
      format: (row: any) => row.entryCount || 0,
    },
    {
      id: "createdAt",
      label: "Created At",
      style: { minWidth: 100, verticalAlign: "top" },
      align: "right",
      format: (row: any) =>
        new Date(row.createdAt).toLocaleDateString("en-US"),
    },
    {
      id: "edit",
      label: "",
      align: "right",
      format: (row: any) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 48,
          }}
        >
          <Link to={`/contest/${row.id}/edit`}>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton
            onClick={() => {
              handleDelete(row.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <TabPanel value={value} index={index}>
        <TableContainer>
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
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id + "-" + index}
                            align={column.align}
                            style={column.style}
                          >
                            {column.format &&
                            typeof value !== "object"
                              ? column.format(row)
                              : value}
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
          style={{ display: "table" }}
        />
      </TabPanel>
    </>
  );
};
