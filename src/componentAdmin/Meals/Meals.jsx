import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Paper,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  withStyles,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import { Link as changeURL, useHistory } from "react-router-dom";
import { deletedMeal, listMeal } from "../../actions/mealAction";

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Meals = () => {
  const dispatch = useDispatch();
  const mealList = useSelector((state) => state.mealList);
  const { loading, error, meals } = mealList;

  const deleteMeal = useSelector((state) => state.removeMeal);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = deleteMeal;
  const history = useHistory();
  useEffect(() => {
    dispatch(listMeal());
  }, [dispatch, successDelete]);

  useEffect(() => {
    if (deleteMeal) {
      deleteMeal.success = false;
    }
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [mealChosen, setMealChosen] = useState();
  const handleClickOpen = (mealId) => {
    setOpen(true);
    setMealChosen(mealId);
  };

  const handleClose = () => {
    setOpen(false);
    setMealChosen("");
  };
  const handleRemove = () => {
    setOpen(false);
    dispatch(deletedMeal(mealChosen));
  };

  return (
    <main className={classes.container}>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid item xs={12}>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Delete this item?"}
            </DialogTitle>

            <DialogActions>
              <Button variant="outlined" color="primary" onClick={handleClose}>
                Disagree
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.pink}
                onClick={handleRemove}
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>
          <Box marginBottom={3}>
            <Paper elevation={3} style={{ padding: "40px" }}>
              <Box display="flex">
                <Box>
                  <Typography
                    variant="h5"
                    style={{ marginBottom: "10px", color: "#052963" }}
                  >
                    Meals
                  </Typography>
                </Box>
                <Box ml="auto">
                  <Button
                    variant="contained"
                    className={classes.pink}
                    component={changeURL}
                    to="/admin/meal/create"
                  >
                    + Add new meal
                  </Button>
                </Box>
              </Box>

              {loadingDelete && (
                <CircularProgress
                  style={{ marginBottom: "10px" }}
                  color="secondary"
                />
              )}
              {errorDelete && (
                <Alert style={{ marginBottom: "10px" }} severity="error">
                  {error}
                </Alert>
              )}
              {successDelete && (
                <Alert style={{ marginBottom: "10px" }} severity="success">
                  Successfully Delete
                </Alert>
              )}
              <TableContainer component={Paper}>
                <Table
                  style={{ minWidth: "700" }}
                  aria-label="customized table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>NAME</StyledTableCell>
                      <StyledTableCell align="center">IMAGE</StyledTableCell>
                      <StyledTableCell align="center">
                        INGREDIENTS
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        INSTRUCTIONS
                      </StyledTableCell>
                      <StyledTableCell align="center">TYPE</StyledTableCell>
                      <StyledTableCell align="center">ACTIONS</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {meals.map((meal) => (
                      <StyledTableRow key={meal._id}>
                        <StyledTableCell component="th" scope="row">
                          {meal.name}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          component="th"
                          scope="row"
                        >
                          <img
                            width="50px"
                            height="50px"
                            src={meal.image}
                            alt="ingredient"
                          ></img>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {meal.ingredients}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {meal.instruction}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {meal.type}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Button
                                variant="contained"
                                className={classes.pink}
                                onClick={() =>
                                  history.push(`/admin/meal/${meal._id}`)
                                }
                                fullWidth
                              >
                                Update
                              </Button>
                            </Grid>
                          </Grid>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Button
                                variant="contained"
                                className={classes.pink}
                                onClick={() => handleClickOpen(meal._id)}
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
      )}
    </main>
  );
};

export default Meals;
