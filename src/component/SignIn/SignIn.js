import { CircularProgress } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as Register, useHistory } from 'react-router-dom';
import { signin } from '../../actions/userActions';
import useStyles from './styles'



export default function SignIn(props) {
    const classes = useStyles();
    const initialState = { email: '', password: '' }
    const dispatch = useDispatch()
    const history = useHistory()
    const userSignIn = useSelector((state) => state.userSignIn)
    const { userInfo, loading, error } = userSignIn
    const [form, setForm] = useState(initialState)
    const handleOnChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(signin(form.email, form.password))
    }

    const redirect = props.location.search
        ? props.location.search.split("=")[1]
        : "/";

    const redirectCalculator = props.location.search
        ? props.location.search.split("=")[1]
        : "/calculator";

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
                    Sign in
                </Typography>
                {loading && <CircularProgress color="secondary" />}
                {error && <Alert severity="error">{error}</Alert>}
                <form className={classes.form} onSubmit={handleOnSubmit} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
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
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.pink}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link component={Register} to={`/register?redirect=${redirectCalculator}`} variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}