import {
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Grid,
} from "@material-ui/core";
import * as yup from "yup";
import { useFormik } from "formik";
import { useParams, useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
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
});

export const EnterContest = (props: any) => {
  const params: any = useParams();
  const classes = useStyles();
  const history = useHistory();

  const handleSubmit = (values: any) => {
    console.log(`values are ${values}`);
    fetch("/api/enter/contest", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contestid: params.id,
        title: values.title,
        description: values.description,
      }),
    }).then(() => history.push(`/contest/${params.id}`));
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <Grid
      container
      className={classes.layout}
      direction="column"
      justify="center"
    >
      <form onSubmit={formik.handleSubmit}>
        <Typography
          style={{ alignSelf: "center", paddingBottom: 20 }}
          color="textPrimary"
          variant="h4"
        >
          Enter the contest
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={6}>
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
              error={
                formik.touched.title && Boolean(formik.errors.title)
              }
              helperText={formik.touched.title && formik.errors.title}
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
              value={formik.values.description}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={
                formik.touched.description &&
                Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description &&
                formik.errors.description
              }
            />
          </Grid>
          <Paper
            className={classes.paper}
            style={{ marginTop: "auto" }}
          >
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
        </Grid>
      </form>
    </Grid>
  );
};