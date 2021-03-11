// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormGroup from '@material-ui/core/FormGroup';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';
// import { useState } from 'react';
// import { UserData } from "../types/UserData";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     display: "contents"
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// type HeaderProps = {
//   userData: UserData | null;
//   loginUrl: string;
// };

// export const Header = ({ userData, loginUrl }: HeaderProps ) => {
//   const classes = useStyles();
//   const [auth, setAuth] = useState(true);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   const handleMenu = (event: any) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div className={classes.root}>
//       <AppBar style={{ width: "100%" }} position="static">
//         <Toolbar>
//           <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" className={classes.title}>
//             Photos
//           </Typography>
//           {auth && (
//             <div>
//               <IconButton
//                 aria-label="account of current user"
//                 aria-controls="menu-appbar"
//                 aria-haspopup="true"
//                 onClick={() => {}}
//                 color="inherit"
//               >
//                 <AccountCircle />
//               </IconButton>
//               <Menu
//                 id="menu-appbar"
//                 anchorEl={anchorEl}
//                 anchorOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right',
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right',
//                 }}
//                 open={open}
//                 onClose={handleClose}
//               >
//                 <MenuItem onClick={handleClose}>Profile</MenuItem>
//                 <MenuItem onClick={handleClose}>My account</MenuItem>
//               </Menu>
//             </div>
//           )}
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserData } from "../types/UserData";
import { Context } from "../store";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@material-ui/core";

type HeaderProps = {
  userData: UserData | null;
  loginUrl: string;
};

export const Header = ({ userData, loginUrl }: HeaderProps) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, dispatch] = useContext(Context);

  const handleRoute = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    dispatch({ type: "SET_SECTION", payload: "home" });
    history.push(path);
  };

  const confirmLogout = () => {
    window.location.href= "/api/auth/logout";
  }

  return (
    <div className="header">
      <a onClick={(e) => handleRoute(e, "/")} href="/">
        <img alt="streampoll-logo" src="/img/logo.svg" />
      </a>
      <div className="connect">
        {userData ? (
          <>
            <Link
              onClick={(e) => handleRoute(e, "/profile")}
              to="/profile"
              className="user-link roboto-normal-white-24px"
            >
              <img     
                alt="user-avatar"
                style={{ 
                  width: 42,
                  height: 42,
                  marginRight: 12,
                  borderRadius: "50%",
                  border: "3px solid #524366"
                }}
                src={userData.profile_image_url}
              />
              {userData.display_name}
            </Link>
            <div
              onClick={() => setOpen(true)}
              style={{ cursor: "pointer" }}
              className="user-link roboto-normal-white-24px"
            >
              Log Out
            </div>
          </>
        ) : (
          <a className="user-link roboto-normal-white-24px" href={loginUrl}>
            <img
              className="twitch-login-icon"
              alt="twitch-logo"
              width="28px"
              height="28px"
              src="/img/twitch-logo.svg"
            />
            Log In
          </a>
        )}
      </div>
      
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Do you really want to log out?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you really want to log out please confirm
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="contained" color="primary">
            Cancel
          </Button>
          <Button onClick={confirmLogout} variant="contained" color="secondary" autoFocus>
            Log Out
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};
