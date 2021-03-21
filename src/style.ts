import { createStyles, darken, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    "@global": {
      "html,body": {
        boxSizing: "border-box",
        background: theme.palette.background.default,
      },
      '*::-webkit-scrollbar': {
        width: 10
      },
      '*::-webkit-scrollbar-track': {
        // '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        backgroundColor: darken(theme.palette.background.default, 0.1),
        borderRadius: 4,
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.main,
        borderRadius: 4,
      }
    },
  })
);

export const GlobalStyle = () => {
  useStyles();

  return null;
};

export const useBaseStyles = makeStyles((theme) => ({
  layout: {
    height: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 50,
    marginBottom: 50,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    [theme.breakpoints.up("md")]: {
      width: "60%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "40%",
    },
  },
  paper: {
    padding: theme.spacing(2),
    background: "none",
    border: "none",
    boxShadow: "none",
  },
}));
