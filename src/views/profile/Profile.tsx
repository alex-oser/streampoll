import { AppBar, makeStyles, Tab, Tabs, Typography } from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import { UserData } from "../../types/UserData";
import { TabPanel } from "./tabs/TabPanel"
import { Settings } from "./tabs/Settings"
import { MyPolls } from "./tabs/MyPolls"

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: 50,
    marginBottom: 50,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
}));

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}



export const Profile = ({ userData }: { userData: UserData | null }) => {
  const [value, setValue] = useState<number>(0);
  const classes = useStyles();
  const handleChange = (event: ChangeEvent<any>, index: number) => {
    setValue(index);
  };

  return (
    <div className={classes.layout}>
      <Typography style={{ margin: "12px 0 24px 0" }} color="textPrimary" variant="h4">
        My Profile
      </Typography>
      <AppBar position="static">
        <Tabs
          value={value}
          variant="fullWidth"
          onChange={handleChange}
          // indicatorColor="primary" 
          aria-label="simple tabs example"
        >
          <Tab label="My Polls" {...a11yProps(0)} />
          <Tab label="My Activity" {...a11yProps(1)} />
          <Tab label="General Settings" {...a11yProps(2)} />
          <Tab label="Test Info" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <MyPolls value={value} index={0}></MyPolls>
      <TabPanel style={{ overflow: "auto" }} value={value} index={1}>TODO</TabPanel>
      <Settings value={value} index={2}></Settings>
      <TabPanel style={{ overflow: "auto" }} value={value} index={3}>
        <div style={{ color: "#fff" }}>Temporary tab for validation</div>
        <pre style={{ color: "#fff" }}>{JSON.stringify(userData, null, 2)}</pre>
      </TabPanel>
    </div>
  );
};
