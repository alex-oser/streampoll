import { Checkbox, FormControlLabel, Typography } from "@material-ui/core";
import { TabPanel } from "./TabPanel";

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