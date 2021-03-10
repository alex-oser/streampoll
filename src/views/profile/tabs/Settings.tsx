import { Checkbox, FormControlLabel, Typography } from "@material-ui/core";
import { UserSettings } from "../../../types/UserData";
import { useState, useEffect } from "react";
import { TabPanel } from "./TabPanel";

export const Settings = (props: any) => {
  const { value, index } = props;
  const initialSettings = {
    requireTwitchAuth: false,
    allowEmailNotifications: false,
    allowTwitchNotifications: false,
  }
  const [ settings, setSettings ] = useState<UserSettings>(initialSettings);
  const [ dbSettings, setDbSettings ] = useState<any | null>(null);

  // On page load fetch user settings
  useEffect(() => {
    fetch("/api/me/settings", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          setDbSettings(res)
          setSettings(res)
        }
      }
      );
  }, []);

  useEffect(() => {
    const _ = require("lodash")
    if (dbSettings !== null && ! _.isEqual(settings, dbSettings)) {
      fetch("/api/me/settings", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings)
      }).then(() => {
        setDbSettings(settings)
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ settings ]);

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
              checked={settings.requireTwitchAuth}
              onChange={() => {
                const newSettings = Object.assign({}, settings)
                newSettings.requireTwitchAuth = ! settings.requireTwitchAuth
                setSettings(newSettings)
              }}
              name="enterAnybody"
            />
          }
          label="Require Twitch authentication after each login"
        />
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={settings.allowEmailNotifications}
              onChange={() => {
                const newSettings = Object.assign({}, settings)
                newSettings.allowEmailNotifications = ! settings.allowEmailNotifications
                setSettings(newSettings)
              }}
              name="enterAnybody"
            />
          }
          label="Receive email notifications"
        />
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={settings.allowTwitchNotifications}
              onChange={() => {
                const newSettings = Object.assign({}, settings)
                newSettings.allowTwitchNotifications = ! settings.allowTwitchNotifications
                setSettings(newSettings)
              }}
              name="enterAnybody"
            />
          }
          label="Receive Twitch notifications"
        />
      </TabPanel>
    </>
  );
};