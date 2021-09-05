import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userActions';
import { useHistory } from 'react-router-dom';
import { CircularProgress, FormControl, FormLabel, Radio, RadioGroup } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import useStyles from './styles'

export default function Register(props) {
    const classes = useStyles();
    const [checkPassword, setCheckPassword] = useState(false)
    const initialState = { name: '', email: '', password: '', confirmPassword: '', gender: '' }
    const dispatch = useDispatch()
    const history = useHistory()
    const { userInfo } = useSelector((state) => state.userSignIn)
    const { loading, error } = useSelector((state) => state.userRegister)
    const [form, setForm] = useState(initialState)
    const handleOnChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
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
    const handleOnSubmit = (e) => {
        e.preventDefault()
        if (form.confirmPassword !== form.password || form.password === '') {
            setCheckPassword(true)
        } else {
            dispatch(register(form.name, form.email, form.password, changeGender(form.gender)))
            setCheckPassword(false)
        }

    }
    const redirect = props.location.search
        ? props.location.search.split("=")[1]
        : "/";
    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, redirect, userInfo])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                {loading && <CircularProgress color="secondary" />}
                {error && <Alert style={{ marginTop: '10px' }} severity="error">{error}</Alert>}
                {checkPassword && <Alert severity="error">Password is not match with confirm password</Alert>}
                <form className={classes.form} onSubmit={handleOnSubmit} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={form.name}
                        onChange={handleOnChange}

                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleOnChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={form.password}
                        onChange={handleOnChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="ConfirmPassword"
                        type="password"
                        id="confirmPassword"
                        autoComplete="current-password"
                        value={form.confirmPassword}
                        onChange={handleOnChange}
                    />
                    <FormControl component="fieldset" style={{ marginTop: '10px' }}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" value={form.gender} onChange={handleOnChange}>
                            <FormControlLabel value="false" control={<Radio />} label="Female" />
                            <FormControlLabel value="true" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>
                    <Button style={{ backgroundColor: '#f73471' }}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                </form>
            </div>
        </Container >
    );
}