import { AppBar, Tab, Tabs, Typography } from "@material-ui/core";
import { ChangeEvent, useState, useEffect } from "react";
import { Settings } from "./tabs/Settings";
import { Polls } from "./tabs/Polls";
import { Activity } from "./tabs/Activity";
import { useBaseStyles } from "../../style";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { useHistory, useParams } from "react-router";

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  overrides: {
    [theme.breakpoints.down("sm")]: {
      width: "98%",
    },
    [theme.breakpoints.up("md")]: {
      width: "70%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "50%",
    },
  },
}));

export const Profile = () => {
  const classes = useStyles();
  const baseClasses = useBaseStyles();
  const history = useHistory();
  const params = useParams<any>();
  const [value, setValue] = useState<number>(0);
  const handleChange = (event: ChangeEvent<any>, index: number) => {
    setValue(index);
  };

  const tabMap = [
    {
      title: "Activity",
      component: Activity,
      children: null,
    },
    {
      title: "Polls",
      component: Polls,
      children: null,
    },
    {
      title: "Settings",
      component: Settings,
      children: null,
    }
  ];

  useEffect(() => {
    const tabId = tabMap.findIndex(tab => params.tab === tab.title.toLowerCase());
    setValue(tabId);

  }, [params.tab]);

  return (
    <div className={clsx(baseClasses.layout, classes.overrides)}>
      <Typography
        style={{ margin: "12px 0 24px 0" }}
        color="textPrimary"
        variant="h4"
      >
        My Profile
      </Typography>
      <AppBar position="static">
        <Tabs
          value={value}
          variant="fullWidth"
          onChange={handleChange}
          indicatorColor="secondary"
          aria-label="simple tabs example"
        >
          {tabMap.map((tab, index) => (
            <Tab
              onClick={() => history.push(`/profile/${tab.title.toLowerCase()}`)}
              key={tab.title}
              label={tab.title}
              style={{ fontWeight: "bold" }}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </AppBar>
      {tabMap.map((tab, index) => {
        const Component: any = tab.component;
        return (
          <Component key={tab.title} value={value} index={index}>
            {tab.children}
          </Component>
        );
      })}
    </div>
  );
};
