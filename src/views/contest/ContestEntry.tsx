import {
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  layout: {
    height: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 50,
    marginBottom: 50,
    overflowY: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
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

const validationSchema = yup.object({
  title: yup
    .string()
    .min(3, "min req")
    .max(255, "Description should be of max of 255 characters")
    .required("Title is required"),
  description: yup
    .string()
    .min(5, "Description should be at least 5 characters")
    .max(1000, "Description should be of max of 1000 characters")
    .required("Description is required"),
  url: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?(i\.)?imgur.com(\/?[a-zA-Z0-9#]+)*\.([a-zA-Z0-9]+)?$/,
      "Enter a valid Imgur url"
    ),
});

export const ContestEntry = (props: any) => {
  const handleSubmit = props.handleSubmit;
  const title = props.title;
  const classes = useStyles();

  // set data on edit
  useEffect(() => {
    formik.setValues(props.initialValues);
  }, [props.initialValues]);

  const formik = useFormik({
    initialValues: props.initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  console.log(props.contestData);

  return (
    <form className={classes.layout} onSubmit={formik.handleSubmit}>
      <Typography
        style={{ alignSelf: "center", paddingBottom: 20 }}
        color="textPrimary"
        variant="h4"
      >
        {title}
      </Typography>
      <TextField
        color="secondary"
        required
        id="title"
        name="title"
        label="Title"
        value={formik.values.title}
        fullWidth
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />
      <TextField
        color="secondary"
        style={{ paddingBottom: 20 }}
        required
        multiline
        rows="4"
        id="description"
        name="description"
        label="Description"
        fullWidth
        value={formik.values.description}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        error={
          formik.touched.description &&
          Boolean(formik.errors.description)
        }
        helperText={
          formik.touched.description && formik.errors.description
        }
      />
      {props.contestData?.allowImageLinks && (
        <TextField
          color="secondary"
          style={{ paddingBottom: 10 }}
          id="url"
          name="url"
          label="Imgur Link"
          value={formik.values.url}
          fullWidth
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.url && Boolean(formik.errors.url)}
          helperText={formik.touched.url && formik.errors.url}
        />
      )}
      {!Boolean(formik.errors.url) && formik.values.url ? (
        <div
          style={{
            height: "100%",
            backgroundImage: `url(${formik.values.url})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        />
      ) : null}
      <Paper className={classes.paper} style={{ marginTop: "auto" }}>
        <Button
          // disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
          style={{ display: "flex", margin: "auto" }}
        >
          <Typography color="textPrimary" variant="h5">
            Enter Contest
          </Typography>
        </Button>
      </Paper>
    </form>
  );
};
