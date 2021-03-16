import { IconButton, Typography } from "@material-ui/core";
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
import DeleteIcon from '@material-ui/icons/Delete';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useEffect } from "react";
import { useState } from "react";
import { TabPanel } from "./TabPanel";
import { ContestStatus } from "../../../components/ContestStatus";
import { useHistory } from "react-router";

export const Activity = (props: any) => {
  const { value, index } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const history = useHistory();
  const height = 69;
  const [rows, setRows] = useState<any>([
    {
      title: <Skeleton height={height} />,
      createdAt: <Skeleton height={height} />,
      status: <Skeleton height={height} />,
      edit: <Skeleton height={height} />,
    },
    {
      title: <Skeleton height={height} />,
      createdAt: <Skeleton height={height} />,
      status: <Skeleton height={height} />,
      edit: <Skeleton height={height} />,
    },
    {
      title: <Skeleton height={height} />,
      createdAt: <Skeleton height={height} />,
      status: <Skeleton height={height} />,
      edit: <Skeleton height={height} />,
    },
    {
      title: <Skeleton height={height} />,
      createdAt: <Skeleton height={height} />,
      status: <Skeleton height={height} />,
      edit: <Skeleton height={height} />,
    },
  ]);

  const handleView = (contestId: string, entryId: string) => {
    history.push(`/contest/${contestId}/entry/${entryId}/edit`);
  };

  const handleEdit = (contestId: string, entryId: string) => {
    history.push(`/contest/${contestId}/entry/${entryId}/edit`);
  };

  const handleDelete = (contestId: string, entryId: string) => {
    fetch(`/api/contest/${contestId}/entry/${entryId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then(() => getMyEntries());
  }

  const columns = [
    {
      id: "title",
      label: "Contest",
      style: { minWidth: 100, verticalAlign: "top" },
      format: (row: any) => (
        <div style={{ display: "flex" }}>
          <img
            src={row.contest.hostProfileImageUrl}
            style={{ height: 100, paddingRight: 16 }}
            alt="contest host"
          />
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
      label: "Entry Time",
      style: { minWidth: 120, verticalAlign: "top" },
      format: (row: any) =>
        new Date(row.entry.createdAt).toLocaleDateString("en-US"),
    },
    {
      id: "status",
      label: "Status",
      style: { minWidth: 100, verticalAlign: "top" },
      format: (row: any) => <ContestStatus contest={row.contest} />,
    },
    {
      id: "edit",
      label: "",
      align: "right",
      format: (row: any) => (
        <div style={{ display: "flex", flexDirection: "column", width: 50 }}>
          <IconButton
            onClick={() => {
              handleView(row.contest.id, row.entry.id);
            }}
          >
            <ExitToAppIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              handleEdit(row.contest.id, row.entry.id);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              handleDelete(row.contest.id, row.entry.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    }
  ];

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getMyEntries = (() => {
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
  })

  const getEntriesData = (entries: any) => {
    fetch("/api/contest/entry/list", {
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
    getMyEntries();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
