import { AppBar, makeStyles, Tab, Tabs, Typography } from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import { UserData } from "../../types/UserData";
import { TabPanel } from "./tabs/TabPanel"
import { Settings } from "./tabs/Settings"
import { MyPolls } from "./tabs/Polls"
import { MyActivity } from "./tabs/Activity";

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

const a11yProps = (index: number) => {
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

  const tabMap = [
    {
      title: "Polls",
      component: MyPolls,
      children: null
    },
    {
      title: "Activity",
      component: MyActivity,
      children: null
    },
    {
      title: "Settings",
      component: Settings,
      children: null
    },
    {
      title: "Test",
      component: TabPanel,
      children: <pre style={{ color: "#fff" }}>{JSON.stringify(userData, null, 2)}</pre>
    },
  ]

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
          {tabMap.map((tab, index) => (
            <Tab key={tab.title} label={tab.title} {...a11yProps(index)} />
          ))}
        </Tabs>
      </AppBar>
      {tabMap.map((tab, index) => {
        const Component: any = tab.component
        return (
          <Component key={tab.title} value={value} index={index}>{tab.children}</Component>
        )
      })}
    </div>
  );
};
