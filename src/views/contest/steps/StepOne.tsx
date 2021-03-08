import { TextField, Typography, Grid } from "@material-ui/core";
import { useContext, useEffect } from "react";
import { AppleStyleToggle } from "../../../components/AppleStyleToggle";
import { Context } from "../../../store";
import * as yup from "yup";
import { useFormik, useFormikContext } from "formik";
// import { ProgressBar } from "../../../components/ProgressBar";

const validationSchema = yup.object({
  title: yup.string().required("title is required"),
  description: yup
    .string()
    .max(10, "Description should be of minimum 8 characters length")
    .required("Description is required"),
});

export const StepOne = ({ onSubmit }: { onSubmit: Function }) => {
  // const [isDirty, setIsDirty] = useState(false);
  const [state, dispatch] = useContext(Context);
  // const [isPhotoContest, setIsPhotoContest] = useState(true);
  // const [contest, setContest] = useState({
  //   title: "",
  //   description: "",
  //   allowImageLinks: true,
  // });

  // const { values, submitForm } = useFormikContext();
  // console.log(values);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      allowImageLinks: true,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  });

  useEffect(() => {
    dispatch({ type: "SET_CREATE_SETTINGS", payload: formik.values });
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
          value={formik.values.title}
          fullWidth
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
      </Grid>

      {/* <ProgressBar
        numberOfSteps={4}
        onNext={formik.handleSubmit}
        onSubmit={onSubmit}
      /> */}
      <Grid item xs={12}>
        <TextField
          color="secondary"
          required
          multiline
          rows="6"
          id="desc"
          name="desc"
          label="Description"
          value={formik.values.description}
          fullWidth
          onChange={formik.handleChange}
        />
      </Grid>

      <Grid item xs={12}>
        <div style={{ flex: 1 }}>
          <AppleStyleToggle
            onChange={formik.handleChange}
            // onChange={(e) =>
            //   setContest({ ...contest, allowImageLinks: e.target.checked })
            // }
            checked={formik.values.allowImageLinks}
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
