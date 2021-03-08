import { TextField, Typography, Grid } from "@material-ui/core";
import { useContext, useEffect } from "react";
import { AppleStyleToggle } from "../../../components/AppleStyleToggle";
import { Context } from "../../../store";

export const StepOne = (props: any) => {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    props.onFormValidate(props);
  }, [props]);

  useEffect(() => {
    dispatch({ type: "SET_CREATE_SETTINGS", payload: props.values });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.stepIndex]);

  return (
    <Grid
      style={{ display: state.stepIndex !== 0 ? "none" : "block" }}
      container
      spacing={3}
    >
      <Grid item xs={12} sm={6}>
        <TextField
          color="secondary"
          required
          id="title"
          name="title"
          label="Title"
          value={props.values.title}
          fullWidth
          onChange={props.handleChange}
          error={props.touched.title && Boolean(props.errors.title)}
          helperText={props.touched.title && props.errors.title}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          color="secondary"
          required
          multiline
          rows="6"
          id="description"
          name="description"
          label="Description"
          fullWidth
          value={props.values.description}
          onChange={props.handleChange}
          error={props.touched.description && Boolean(props.errors.description)}
          helperText={props.touched.description && props.errors.description}
        />
      </Grid>

      <Grid item xs={12}>
        <div style={{ flex: 1 }}>
          <AppleStyleToggle
            name="allowImageLinks"
            onChange={props.handleChange}
            checked={props.values.allowImageLinks}
          />
          <Typography color="textPrimary" variant="h6">
            Photo Contest
          </Typography>
          <Typography color="textPrimary" variant="body2">
            Selecting photo contest will require each submission to have an
            image.
          </Typography>
        </div>
      </Grid>

    </Grid>
  );
};
