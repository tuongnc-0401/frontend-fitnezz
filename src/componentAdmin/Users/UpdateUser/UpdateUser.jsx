import {
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as changeURL, useParams } from "react-router-dom";
import { detailsAdminUser, updatedUser } from "../../../actions/userActions";
import { USER_ADMIN_DETAILS_RESET } from "../../../constants/userConstants";
import useStyles from "./styles";

const UpdateUser = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [err, setErr] = useState({});
  const userAdminDetails = useSelector((state) => state.userAdminDetails);
  const { loading, error, user } = userAdminDetails;
  const updateUser = useSelector((state) => state.updateUser);
  const { loading: updateLoading, error: updateError, success } = updateUser;
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    isAdmin: "",
  });
  const { id } = useParams();

  function changeBoolean(value) {
    switch (value) {
      case "true":
        return true;
      case "false":
        return false;
      default:
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    let valid = true;
    if (userData.password !== userData.confirmPassword && userData.password) {
      err["password"] = "Password and Confirm Password is not match";
      valid = false;
    }
    setErr(err);
    if (valid) {
      dispatch(
        updatedUser({
          _id: userData._id,
          name: userData.name,
          email: userData.email,
          password: userData.password,
          gender: changeBoolean(userData.gender),
          isAdmin: changeBoolean(userData.isAdmin),
        })
      );
    }
  };

  useEffect(() => {
    dispatch({ type: USER_ADMIN_DETAILS_RESET });
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (updateUser) {
      updateUser.success = false;
    }
  }, [updateUser]);
  useEffect(() => {
    if (user && Object.keys(user).length === 0 && user.constructor === Object) {
      dispatch(detailsAdminUser(id));
      return;
    }
    if (user) {
      var gender1 = user.gender ? "true" : "false";
      var isAdmin1 = user.isAdmin ? "true" : "false";
      setUserData({
        ...user,
        password: "",
        confirmPassword: "",
        gender: gender1,
        isAdmin: isAdmin1,
      });
    }
  }, [dispatch, id, user]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          UPDATE NEW USER
        </Typography>
        {loading ? (
          <CircularProgress color="secondary" />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            {updateLoading && (
              <CircularProgress
                style={{ marginTop: "10px" }}
                color="secondary"
              />
            )}
            {updateError && (
              <Alert style={{ marginTop: "10px" }} severity="error">
                {updateError}
              </Alert>
            )}
            {err?.password && (
              <Alert style={{ marginTop: "10px" }} severity="error">
                {err.password}
              </Alert>
            )}
            {success && (
              <Alert elevation={2} severity="success" fullWidth>
                Success{" "}
              </Alert>
            )}
            <TextField
              autoComplete="name"
              autoFocus
              margin="normal"
              name="name"
              variant="outlined"
              label="Name"
              fullWidth
              value={userData?.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            ></TextField>
            <TextField
              margin="normal"
              name="email"
              variant="outlined"
              label="Email"
              fullWidth
              value={userData?.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            ></TextField>
            <TextField
              margin="normal"
              type="password"
              name="password"
              variant="outlined"
              label="Password"
              fullWidth
              value={userData?.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            ></TextField>
            <TextField
              margin="normal"
              type="password"
              name="confirmPassword"
              variant="outlined"
              label="Confirm Password"
              fullWidth
              value={userData?.confirmPassword}
              onChange={(e) =>
                setUserData({ ...userData, confirmPassword: e.target.value })
              }
            ></TextField>
            <FormControl
              component="fieldset"
              style={{ marginTop: "10px", display: "block" }}
            >
              <FormLabel component="legend">Role</FormLabel>
              <RadioGroup
                aria-label="role"
                name="isAdmin"
                value={userData?.isAdmin || ""}
                onChange={(e) =>
                  setUserData({ ...userData, isAdmin: e.target.value })
                }
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Admin"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="User"
                />
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" style={{ marginTop: "10px" }}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={userData?.gender || ""}
                onChange={(e) =>
                  setUserData({ ...userData, gender: e.target.value })
                }
              >
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
            <Grid container spacing={1} style={{ marginTop: "5px" }}>
              <Grid item xs="12" md="6">
                <Button
                  component={changeURL}
                  to="/admin/user/"
                  onClick={() => dispatch({ type: USER_ADMIN_DETAILS_RESET })}
                  variant="outlined"
                  fullWidth
                >
                  Go Back
                </Button>
              </Grid>
              <Grid item xs="12" md="6">
                <Button
                  style={{ backgroundColor: "#f73471" }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </div>
    </Container>
  );
};

export default UpdateUser;
