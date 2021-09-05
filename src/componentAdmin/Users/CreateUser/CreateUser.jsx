import { Box, Button, CircularProgress, Container, CssBaseline, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createdUser } from '../../../actions/userActions';
import useStyles from './styles';
import { Link as changeURL } from "react-router-dom";

const CreateUser = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const [err, setErr] = useState({})
    const [userData, setUserData] = useState({
        name: '', email: '', password: '', confirmPassword: '', gender: 'true', isAdmin: 'false'
    });
    const newUser = useSelector(state => state.newUser)
    const { loading, success, error } = newUser

    function changeBoolean(value) {
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
        if (userData.password !== userData.confirmPassword && userData.password) {
            err["password"] = "Password and Confirm Password is not match"
            valid = false
        }
        if (!userData.password) {
            err["password"] = "Password is required"
            valid = false
        }
        setErr(err)
        if (valid) {
            dispatch(createdUser({ name: userData.name, email: userData.email, password: userData.password, isAdmin: changeBoolean(userData.isAdmin), gender: changeBoolean(userData.gender) }))
        }

    }
    useEffect(() => {
        if (newUser) {
            newUser.success = false
        }
    }, [newUser])
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    CREATE NEW USER
                </Typography>
                {loading && <CircularProgress style={{ marginTop: '10px' }} color="secondary" />}
                {error && <Alert style={{ marginTop: '10px' }} severity="error">{error}</Alert>}
                {err?.password && <Alert style={{ marginTop: '10px' }} severity="error">{err.password}</Alert>}
                {success && <Box display="flex" mt={2}>
                    <Alert elevation={2} severity="success" fullWidth>Success </Alert>

                </Box>}
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <TextField autoComplete="name" autoFocus margin="normal" name="name" variant="outlined" label="Name" fullWidth value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })}></TextField>
                    <TextField margin="normal" name="email" variant="outlined" label="Email" fullWidth value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })}></TextField>
                    <TextField margin="normal" type="password" name="password" variant="outlined" label="Password" fullWidth value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })}></TextField>
                    <TextField margin="normal" type="password" name="confirmPassword" variant="outlined" label="Confirm Password" fullWidth value={userData.confirmPassword} onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}></TextField>
                    <FormControl component="fieldset" style={{ marginTop: '10px', display: "block" }}>
                        <FormLabel component="legend" >Role</FormLabel>
                        <RadioGroup aria-label="role" name="isAdmin" value={userData.isAdmin || ""} onChange={(e) => setUserData({ ...userData, isAdmin: e.target.value })}>
                            <FormControlLabel value="true" control={<Radio />} label="Admin" />
                            <FormControlLabel value="false" control={<Radio />} label="User" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset" style={{ marginTop: '10px' }}>
                        <FormLabel component="legend" >Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" value={userData.gender || ""} onChange={(e) => setUserData({ ...userData, gender: e.target.value })}>
                            <FormControlLabel value="false" control={<Radio />} label="Female" />
                            <FormControlLabel value="true" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>
                    <Grid container spacing={1} style={{ marginTop: "5px" }}>
                        <Grid item xs="12" md="6">
                            <Button component={changeURL} to="/admin/user/" variant="outlined" fullWidth>Go Back</Button>
                        </Grid>
                        <Grid item xs="12" md="6">
                            <Button style={{ backgroundColor: '#f73471' }}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"

                            >
                                Create
                            </Button>
                        </Grid>
                    </Grid>

                </form>
            </div>
        </Container >


    )
}

export default CreateUser
