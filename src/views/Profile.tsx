import { AppBar, Box, Button, Tab, Tabs, Typography } from "@material-ui/core";
import { ChangeEvent, useState } from "react";

import { Link } from "react-router-dom";
import { UserData } from "../types/UserData";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

export const Profile = ({ userData }: { userData: UserData | null }) => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: ChangeEvent<any>, index: number) => {
    setValue(index);
  };

  return (
    <div className="container">
      <Typography style={{ margin: "12px 0 24px 0" }} color="textPrimary" variant="h4">
        Profile
      </Typography>

      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          // indicatorColor="primary" 
          aria-label="simple tabs example"
        >
          <Tab label="Settings" {...a11yProps(0)} />
          <Tab label="My Polls" {...a11yProps(1)} />
          <Tab label="My Activity" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <pre style={{ color: "#fff" }}>{JSON.stringify(userData, null, 2)}</pre>
      </TabPanel>
      <TabPanel value={value} index={1}>
        TODO:
      </TabPanel>
      <TabPanel value={value} index={2}>
      TODO:
      </TabPanel>

      <Link to="/">
        <Button variant="contained" color="primary">
          Go home
        </Button>
      </Link>
    </div>
  );
};
