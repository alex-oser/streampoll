import { darken, makeStyles, Typography } from "@material-ui/core";
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
        "poll-option-active": isActive,
      })}
    >
      <div className={classes.autoFlex}>
        <div
          className={clsx(
            "poll-option-title-i12 valign-text-middle",
            {
              "roboto-normal-white-24px": isActive,
              "roboto-normal-storm-dust-24px": !isActive,
            }
          )}
        >
          <Typography color="textPrimary" variant="h5">
            {title}
          </Typography>
        </div>
        <div
          className={clsx(
            "poll-option-title-i12 valign-text-middle",
            {
              "roboto-normal-white-18px": isActive,
              "roboto-normal-storm-dust-18px": !isActive,
            }
          )}
        >
          <Typography color="textPrimary" variant="body2">
            {description}
          </Typography>
        </div>
      </div>
    </div>
  );
};
