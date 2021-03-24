import { useEffect, useState } from "react";
import {
  InputAdornment,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
  TableRow,
  Paper,
} from "@material-ui/core";
import { useContext } from "react";

import { Context } from "../../../store";
import * as yup from "yup";
import { FormikValues, useFormik } from "formik";
import { ProgressBar } from "../../../components/StepProgress";
import IconCheck from "@material-ui/icons/CheckRounded";
import IconCross from "@material-ui/icons/Clear";
import {
  FormControl,
  FormHelperText,
  OutlinedInput,
} from "@material-ui/core";
import { TwitchUserData } from "../../../types/TwitchUserData";
import { UserData } from "../../../types/UserData";
import { useAuth } from "../../../hooks/useAuth";
import { Prompt } from "react-router";

const validationSchema = yup.object({
  host: yup
    .string()
    .min(3, "Min length 3")
    .max(25, "Host should be of max of 255 characters")
    .required("Host is required"),
});

const initialState: TwitchUserData = {};

export const StepThree = (props: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, dispatch] = useContext(Context);
  const [isFetching, setIsFetching] = useState(false);
  const [hostData, setHostData] = useState(initialState);
  const [spinner, setSpinner] = useState<any>();
  const [mods, setMods] = useState([]);
  const userData: UserData | null = useAuth();
  const [selfName, setSelfName] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      host: userData?.username || "",
    },
    validateOnChange: false,
    validationSchema: validationSchema,
    onSubmit: async (values: FormikValues) => {      
      handleSubmitForm({
        ...state.createSettings,
        ...values,
      })
    },
  });

  const hasErrors = formik.getFieldMeta("host").error != null;

  useEffect(() => {
    if (userData) {
      formik.setFieldValue("host", userData.username);
    }
  }, [userData]);

  useEffect(() => {
    if (!selfName && formik.values.host) {
      validateUsername();
      setSelfName(true);
    }
  }, [formik.values.host]);

 

  const validateUsername = () => {
    if (!formik.isValid && formik.values.host !== "") {
      return;
    }

    setIsFetching(true);
    fetch(`/api/twitch/user/${formik.values.host}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          formik.setFieldError("host", "User not found");
        }
        setIsFetching(false);
        setHostData(res);
      });

    fetch(`/api/twitch/user/${formik.values.host}/mods`)
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          setMods(res);
        }
      });
  };

  const handleSubmitForm = async (values: any) => {
    const contestSettings = {
      ...state.createSettings,
      ...values,
    }

    props.onSubmit(contestSettings);
  };

  useEffect(() => {
    if (isFetching && formik.values.host) {
      setSpinner(<CircularProgress />);
    } else if (hasErrors) {
      setSpinner(<IconCross style={{ color: "red" }} />);
    } else if (formik.values.host && formik.isValid) {
      setSpinner(<IconCheck style={{ color: "green" }} />);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  // load data test for edit
  useEffect(() => {
    if (!props.initialValues) {
      return;
    }

    for (const key of Object.keys(formik.values)) {
      const val = props.initialValues[key];
      formik.setFieldValue(key, val);
    }

    formik.validateForm();
  }, [props.initialValues]);

  return (
    <form onSubmit={formik.handleSubmit} style={props.style}>
      <Prompt
        message="Are you sure you want to leave?"
        when={formik.submitCount === 0}
      />

      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <FormControl variant="outlined">
              <InputLabel htmlFor="host">Host</InputLabel>
              <OutlinedInput
                color="secondary"
                required
                id="host"
                name="host"
                label="Host"
                value={formik.values.host}
                onBlur={(event) => {
                  formik.handleBlur(event);
                  validateUsername();
                }}
                onKeyDown={(event) => {
                  if (formik.isValid && event.code === "Enter") {
                    formik.handleChange(event);
                    validateUsername();
                  }
                }}
                onChange={(event) => {
                  formik.handleChange(event);
                  setSpinner(null);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <>{spinner}</>
                  </InputAdornment>
                }
                aria-describedby="outlined-host-helper-text"
                inputProps={{
                  "aria-label": "host",
                }}
                labelWidth={0}
                error={
                  formik.touched.host && Boolean(formik.errors.host)
                }
              />
              <FormHelperText id="outlined-host-helper-text">
                {formik.touched.host && formik.errors.host}
              </FormHelperText>
            </FormControl>
            {hostData.profile_image_url ? (
              <img
                src={hostData.profile_image_url}
                style={{ height: 69, paddingLeft: 20 }}
                alt="contest host"
              />
            ) : null}
          </div>
          <FormControlLabel
            style={{ color: "#fff" }}
            control={
              <Checkbox
                color="primary"
                // checked={settings.requireTwitchAuth}
                onChange={
                  () => {}
                  // setSettings({
                  //   ...settings,
                  //   requireTwitchAuth: !settings.requireTwitchAuth,
                  // })
                }
                name="enterAnybody"
              />
            }
            label="Require Twitch authentication after each login"
          />   
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography color="textPrimary" variant="h6">
            Contest Admins
          </Typography>
          <TableContainer
            style={{ width: "auto", height: "fit-content" }}
            component={Paper}
          >
            <Table size="small" aria-label="a dense table">
              <TableBody>
                {mods.map((mod) => (
                  <TableRow key={mod}>
                    <TableCell component="th" scope="row">
                      {mod}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <ProgressBar
        numberOfSteps={3}       
        onSubmit={() => {}}
      />
    </form>
  );
};
