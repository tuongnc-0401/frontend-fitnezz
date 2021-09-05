import { Box, Button, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, withStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/lab/Alert';
import React, { forwardRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as changeURL } from 'react-router-dom';
import useStyles from './styles.js';
import { getAllProgram, deleteOneProgram } from './../../actions/programActions';
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

const Programs = ({ history }) => {
    const dispatch = useDispatch()

    const delProgram = useSelector(state => state.delProgram);
    const { loading: loadingDelete, error: errorDelete, program: successDelete } = delProgram;

    // cua day
    useEffect(() => {
        dispatch(getAllProgram());
    }, [dispatch, delProgram]);

    const { loading, error, listPrograms } = useSelector(state => state.getAllPrograms);

    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const [programChosen, setProgramChosen] = useState()
    const handleClickOpen = (programId) => {
        setOpen(true);
        setProgramChosen(programId)
    };

    const handleClose = () => {
        setOpen(false);
        setProgramChosen("");
    };
    const handleRemove = () => {
        setOpen(false);
        // history.push(`/api/fitnessvideo/${programChosen}`);
        dispatch(deleteOneProgram(programChosen));
    }

    const monthConverter = (month) => {
        switch (month) {
            case 0:
                return "January";
            case 1:
                return "February";
            case 2:
                return "March";
            case 3:
                return "April";
            case 4:
                return "May";
            case 5:
                return "June";
            case 6:
                return "July";
            case 7:
                return "August";
            case 8:
                return "September";
            case 9:
                return "October";
            case 10:
                return "November";
            case 11:
                return "December";
            default:
                break;
        }
    };

    const genderConverter = (boolean) => {
        switch (boolean) {
            case true:
                return 'Male';
            case false:
                return 'Female';
            default:
                break;
        }
    };

    useEffect(() => {
        if (delProgram) {
            delProgram.success = false
        }
    }, [delProgram])

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
                            <DialogTitle id="alert-dialog-slide-title">{"Delete this program?"}</DialogTitle>

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
                                            PROGRAMS
                                        </Typography>
                                    </Box>
                                    <Box ml="auto">
                                        <Button variant="contained"
                                            className={classes.pink}
                                            component={changeURL}
                                            to="/admin/videos/create"
                                        >
                                            + Add new program
                                        </Button>
                                    </Box>

                                </Box>

                                {loadingDelete && <CircularProgress style={{ marginBottom: '10px' }} color="secondary" />}
                                {errorDelete && <Alert style={{ marginBottom: '10px' }} severity="error">{errorDelete}</Alert>}
                                {successDelete && <Alert style={{ marginBottom: '10px' }} severity="success">Successfully Delete</Alert>}
                                <TableContainer component={Paper}>
                                    <Table style={{ minWidth: "700" }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Name</StyledTableCell>
                                                <StyledTableCell align="center">Image</StyledTableCell>
                                                <StyledTableCell align="center">Type</StyledTableCell>

                                                {/* add */}
                                                <StyledTableCell align="center">Equipment</StyledTableCell>
                                                <StyledTableCell align="center">Release Date</StyledTableCell>
                                                <StyledTableCell align="center">Time</StyledTableCell>


                                                <StyledTableCell align="center">Day</StyledTableCell>
                                                <StyledTableCell align="center">Gender</StyledTableCell>
                                                <StyledTableCell align="center">ACTIONS</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {listPrograms?.map((program) => (
                                                <StyledTableRow key={program._id}>
                                                    <StyledTableCell component="th" scope="row">{program.name}</StyledTableCell>
                                                    <StyledTableCell align="center" component="th" scope="row"><img width="50px" height="50px" src={program.imgUrl} alt="ingredient"></img></StyledTableCell>
                                                    <StyledTableCell align="center">{program.type}</StyledTableCell>

                                                    <StyledTableCell align="center">{program.equipment}</StyledTableCell>
                                                    <StyledTableCell align="center">{new Date(program.releaseDate).getDate()}{" "}{monthConverter(new Date(program.releaseDate).getMonth())}{" "}
                                                        {new Date(program.releaseDate).getFullYear()}</StyledTableCell>
                                                    <StyledTableCell align="center">{program.timeMinute}</StyledTableCell>

                                                    <StyledTableCell align="center">{program.duration}</StyledTableCell>
                                                    <StyledTableCell align="center">{genderConverter(program.gender)}</StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12}>
                                                                <Button
                                                                    variant="contained"
                                                                    className={classes.pink}
                                                                    component={ changeURL }
                                                                    to={`/admin/videos/${program._id}`}
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
                                                                    onClick={() => handleClickOpen(program._id)}
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

        // <div>hello</div>
    )
}

export default Programs;
