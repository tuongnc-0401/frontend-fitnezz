import { Box, Button, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, withStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/lab/Alert';
import React, { forwardRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as changeURL, useHistory } from 'react-router-dom';
import { listUsers, deletedUser } from '../../actions/userActions';
import useStyles from './styles.js';
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#052963",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Users = () => {
    const dispatch = useDispatch()
    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList
    const deleteUser = useSelector(state => state.removeUser)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = deleteUser
    const { userInfo } = useSelector(state => state.userSignIn)
    const history = useHistory()
    useEffect(() => {
        dispatch(listUsers())
    }, [dispatch, successDelete])

    useEffect(() => {
        if (deleteUser) {
            deleteUser.success = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const [userChosen, setUserChosen] = useState()
    const handleClickOpen = (productId) => {
        setOpen(true);
        setUserChosen(productId)
    };

    const handleClose = () => {
        setOpen(false);
        setUserChosen("")
    };
    const handleRemove = () => {
        setOpen(false)
        dispatch(deletedUser(userChosen))

    }
    return (
        <main className={classes.container}>
            {loading ? <CircularProgress color="secondary" />
                : error ? <Alert severity="error">{error}</Alert>
                    : <Grid item xs={12}>
                        <Dialog
                            open={open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle id="alert-dialog-slide-title">{"Delete this user?"}</DialogTitle>

                            <DialogActions>
                                <Button variant="outlined" color="primary" onClick={handleClose}>
                                    Disagree
                                </Button>
                                <Button variant="contained" color="secondary" className={classes.pink} onClick={handleRemove} >
                                    Agree
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Box marginBottom={3}>
                            <Paper elevation={3} style={{ padding: "30px" }}>

                                <Box display="flex">
                                    <Box>
                                        <Typography
                                            variant="h5"
                                            style={{ marginBottom: "10px", color: "#052963" }}
                                        >
                                            USERS
                                        </Typography>
                                    </Box>
                                    <Box ml="auto">
                                        <Button variant="contained"
                                            className={classes.pink}
                                            component={changeURL}
                                            to="/admin/user/create"
                                        >
                                            + Add new user
                                        </Button>
                                    </Box>

                                </Box>

                                {loadingDelete && <CircularProgress style={{ marginBottom: '10px' }} color="secondary" />}
                                {errorDelete && <Alert style={{ marginBottom: '10px' }} severity="error">{error}</Alert>}
                                {successDelete && <Alert style={{ marginBottom: '10px' }} severity="success">Successfully Delete</Alert>}
                                <TableContainer component={Paper}>
                                    <Table style={{ minWidth: "700" }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Name</StyledTableCell>
                                                <StyledTableCell align="center">Email</StyledTableCell>
                                                <StyledTableCell align="center">Role</StyledTableCell>
                                                <StyledTableCell align="center">Gender</StyledTableCell>
                                                <StyledTableCell align="center">ACTIONS</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {users.map((user) => (
                                                <StyledTableRow key={user._id}>
                                                    <StyledTableCell component="th" scope="row">
                                                        {user.name}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">{user.email}</StyledTableCell>
                                                    <StyledTableCell align="center">{user.isAdmin ? "admin" : "user"}</StyledTableCell>
                                                    <StyledTableCell align="center">{user.gender ? "male" : "female"}</StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12}>
                                                                <Button
                                                                    variant="contained"
                                                                    className={classes.pink}
                                                                    disabled={user.isAdmin && user._id !== userInfo._id}
                                                                    onClick={() => history.push(`/admin/user/${user._id}`)}
                                                                    fullWidth
                                                                >
                                                                    Update
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12}>
                                                                <Button variant="contained"
                                                                    className={classes.pink}
                                                                    disabled={user.isAdmin && user._id !== userInfo._id}
                                                                    onClick={() => handleClickOpen(user._id)}
                                                                    fullWidth
                                                                >
                                                                    Remove
                                                                </Button>
                                                            </Grid>
                                                        </Grid>


                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Box>
                    </Grid>
            }
        </main >
    )
}

export default Users

