import {
  darken,
  lighten,
  makeStyles,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  autoFlex: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    marginBottom: "5.84px",
    marginLeft: 19,
    minHeight: 56,
    maxWidth: 522,
  },
  base: {
    alignItems: "center",
    backgroundColor: darken(theme.palette.secondary.main, 0.15),
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    display: "flex",
    paddingTop: 14,
    paddingBottom: 4,
    borderLeft: `8px solid ${theme.palette.primary.main}`,
    marginTop: 21,
    width: "100%",
    "&:hover": {
      backgroundColor: lighten(theme.palette.secondary.main, 0.05),
    },
  },
  disabled: {
    color: darken(theme.palette.secondary.contrastText, 0.45),
    opacity: "0.5",
  },
}));

export const PollOption = (props: any) => {
  const { title, description, isActive = true, style } = props;
  const classes = useStyles();

  return (
    <div
      style={style}
      onClick={props.onClick}
      className={clsx(classes.base, {
        [classes.disabled]: !isActive,
      })}
    >
      <div className={classes.autoFlex}>
        <div>
          <Typography
            style={{ fontWeight: "bold" }}
            color="textPrimary"
            variant="h5"
          >
            {title}
          </Typography>
        </div>
        <div className={clsx()}>
          <Typography color="textPrimary" variant="body1">
            {description}
          </Typography>
        </div>
      </div>
    </div>
  );
};
