import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Context } from "../store";
import IconLogout from "@material-ui/icons/ExitToApp";
import IconUser from "@material-ui/icons/AccountBox";

import { UserData } from "../types/UserData";
import {
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

import { useHistory } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  main: {
    alignItems: "right",
    display: "flex",
    height: "44px",
    marginLeft: "auto",
    marginTop: "1px",
    cursor: "pointer",
  },
  root: {
    flexGrow: 1,
    display: "contents",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {},
  image: {},
  userLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: theme.palette.primary.contrastText,
    fontFamily: "Roboto, Helvetica",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: 400,
  },
  dangerButton: {
    background: theme.palette.error.main,
    color: theme.palette.primary.contrastText,
  },
  menuItem: {
    paddingLeft: 6,
  },
}));

type HeaderProps = {
  userData: UserData | null;
  loginUrl: string;
};

const UserLoginInfo = ({
  classes,
  userData,
  onHandleClick,
}: {
  classes: any;
  userData: any;
  onHandleClick: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <>
      <div
        style={{ display: "flex" }}
        onClick={(event: any) => onHandleClick(event)}
      >
        <img
          alt="user-avatar"
          style={{
            width: 38,
            height: 38,
            marginRight: 12,
            borderRadius: "50%",
            border: "3px solid #524366",
          }}
          src={userData.profile_image_url}
        />
        <span className={classes.userLink}>
          {userData.display_name}
        </span>
      </div>
    </>
  );
};

export const Header = ({ userData, loginUrl }: HeaderProps) => {
  const classes = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, dispatch] = useContext(Context);
  const history = useHistory();
  const [logoutDialog, setLogoutDialog] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleRoute = (
    event:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLLIElement, MouseEvent>,
    path: string
  ) => {
    event.preventDefault();
    history.push(path);
  };

  const confirmLogout = () => {
    window.location.href = "/api/auth/logout";
  };

  const handleMenu = (event: {
    currentTarget: React.SetStateAction<null>;
  }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar style={{ width: "100%" }} position="static">
        <Toolbar>
          <a
            className={classes.title}
            onClick={(e) => handleRoute(e, "/")}
            href="/"
          >

          <img
            className={classes.image}
            alt="streampoll-logo"
            style={{ height: 30, width: 30, display: !matches ? "none" : "block" }}
            src={`/img/logo-small.svg`}
          />
    
          <img
            className={classes.image}
            alt="streampoll-logo"
            style={{ width: 250,  display: matches ? "none" : "block" }}
            src={`/img/logo.svg`}
          />
       
          </a>
          <div className={classes.main}>
            {userData ? (
              <UserLoginInfo
                classes={classes}
                userData={userData}
                onHandleClick={(event: any) => {
                  handleMenu(event);
                  setIsMenuOpen(true);
                }}
              />
            ) : (
              <a className={classes.userLink} href={loginUrl}>
                Log In
              </a>
            )}
          </div>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={isMenuOpen}
            disableAutoFocusItem
            onClose={handleClose}
          >
            <MenuItem
              onClick={(e) => {
                handleRoute(e, "/profile");
                handleClose();
              }}
            >
              <IconUser />
              <span className={classes.menuItem}>Profile</span>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setLogoutDialog(true);
                handleClose();
              }}
            >
              <IconLogout />
              <span className={classes.menuItem}>Logout</span>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Dialog
        open={logoutDialog}
        onClose={() => setLogoutDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Do you really want to log out?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you really want to log out please confirm
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setLogoutDialog(false)}
            variant="contained"
            color="primary"
            autoFocus
          >
            Cancel
          </Button>
          <Button
            onClick={confirmLogout}
            variant="contained"
            className={classes.dangerButton}
          >
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
