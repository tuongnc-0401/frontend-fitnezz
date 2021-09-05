import { Box, FormControl, FormLabel, Grid, Paper, TextField, Typography, RadioGroup, FormControlLabel, Radio, Button, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../../../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../../../constants/userConstants';

import ProfileNav from '../ProfileNav';
import useStyles from './styles'
const UserProfile = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.userSignIn)
    const { loading, error, user } = useSelector(state => state.userDetails)
    const [err, setErr] = useState({})
    const [dataForm, setDataForm] = useState({ name: "", email: "", gender: "", password: "", confirmPassword: "" });
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile
    const handleDataForm = (e) => {
        setDataForm({ ...dataForm, [e.target.name]: e.target.value });
    };

    function changeGender(value) {
        switch (value) {
            case "true":
                return true
            case "false":
                return false
            default:
                break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const err = {}
        let valid = true
        if (dataForm.password !== dataForm.confirmPassword) {
            err["password"] = "Password and Confirm Password is not match"
            valid = false
        }
        if (!dataForm.name) {
            err["name"] = "Name is required"
            valid = false
        }
        setErr(err)
        if (valid) {
            dispatch(updateUserProfile({ userId: user._id, name: dataForm.name, gender: changeGender(dataForm.gender), email: dataForm.email, password: dataForm.password }))
        }
    }

    useEffect(() => {
        if (!user && userInfo) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            dispatch(detailsUser(userInfo._id))
        } else {
            if (user) {
                let gender1 = user.gender ? "true" : "false"
                setDataForm({ ...user, gender: gender1, password: "", confirmPassword: "" })
            }
        }
    }, [dispatch, user, userInfo._id, userInfo])


    useEffect(() => {
        if (userUpdateProfile) {
            userUpdateProfile.success = false
        }
        // eslint-disable-next-line
    }, [])

    return (
        <Box mt={5.5}>
            <Box ml={6} mr={6}>
                <Grid container spacing={5}>

                    <Grid item xs={12} md={3}>
                        <ProfileNav current={1}></ProfileNav>
                    </Grid>

                    {loading ? (
                        <CircularProgress color="secondary" />
                    ) : error ? (
                        <Alert severity="error">{error}</Alert>
                    ) : (<Grid item xs={12} md={9}>
                        <Box marginBottom={3}>
                            <Paper elevation={3} style={{ padding: "30px" }}>
                                <Typography
                                    variant="h5"
                                    style={{ marginBottom: "10px", color: "#f73471" }}
                                >
                                    Account Information
                                </Typography>


                                {loadingUpdate && <CircularProgress color="secondary" />}
                                {errorUpdate && <Box mt={3} m={3} >
                                    <Alert severity="error">
                                        {errorUpdate}
                                    </Alert>
                                </Box>}
                                {successUpdate && <Box mt={3} m={3} >
                                    <Alert severity="success">
                                        Updated Successfully
                                    </Alert>
                                </Box>}
                                <form noValidate onSubmit={handleSubmit}>

                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="name"
                                        label="Name"
                                        value={dataForm.name}
                                        id="name"
                                        autoFocus
                                        onChange={handleDataForm}
                                        autoComplete="name"
                                    />
                                    {err["name"] && <Alert severity="error">{err["name"]}</Alert>}
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        value={dataForm.email}
                                        autoComplete="email"
                                        onChange={handleDataForm}
                                    />

                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        value={dataForm.password}
                                        id="password"
                                        onChange={handleDataForm}
                                        autoComplete="current-password"
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type="password"
                                        value={dataForm.confirmPassword}
                                        id="confirmPassword"
                                        onChange={handleDataForm}
                                        autoComplete="current-password"
                                    />
                                    {err["password"] && <Alert severity="error">{err["password"]}</Alert>}
                                    <FormControl style={{ marginTop: "10px" }} component="fieldset">
                                        <FormLabel component="legend">Gender</FormLabel>
                                        <RadioGroup aria-label="gender" name="gender" value={dataForm.gender} onChange={handleDataForm}>
                                            <FormControlLabel value="false" control={<Radio />} label="Female" />
                                            <FormControlLabel value="true" control={<Radio />} label="Male" />
                                        </RadioGroup>
                                    </FormControl>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        className={classes.pink}
                                        onClick={handleSubmit}
                                    >
                                        Update
                                    </Button>
                                </form>
                            </Paper>
                        </Box>
                    </Grid>
                    )}
                </Grid>
            </Box>
        </Box>
    )
}

export default UserProfile
