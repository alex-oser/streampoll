import { AppBar, Checkbox, Button, FormControlLabel, Hidden, makeStyles, Tab, Tabs, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { TabPanel } from "./TabPanel";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    background: "none",
    border: "none",
    boxShadow: "none",
  },
}));

export const Settings = (props: any) => {
  const { value, index } = props;
  return (
    <>
      <TabPanel style={{ overflow: "auto", display: "flex", flexDirection: "column", marginLeft: "auto", marginRight: "auto" }} value={value} index={index}>
        <Typography color="textPrimary" variant="h5">
          General Settings
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              // checked={props.values.enterAnybody}
              // onChange={props.handleChange}
              name="enterAnybody"
            />
          }
          label="Require Twitch authentication after each login"
        />
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              // checked={props.values.enterAnybody}
              // onChange={props.handleChange}
              name="enterAnybody"
            />
          }
          label="Receive email notifications"
        />
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              // checked={props.values.enterAnybody}
              // onChange={props.handleChange}
              name="enterAnybody"
            />
          }
          label="Receive Twitch notifications"
        />
      </TabPanel>
    </>
  );
};