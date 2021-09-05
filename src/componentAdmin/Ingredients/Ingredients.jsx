import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  withStyles,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert";
import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as changeURL, useHistory } from "react-router-dom";
import {
  deletedIngredient,
  listIngredients,
} from "../../actions/ingredientActions";
import useStyles from "./styles.js";
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

const Ingredients = () => {
  const dispatch = useDispatch();
  const ingredientList = useSelector((state) => state.ingredientList);
  const { loading, error, ingredients } = ingredientList;

  const deleteIngredient = useSelector((state) => state.removeIngredient);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = deleteIngredient;
  const history = useHistory();
  useEffect(() => {
    dispatch(listIngredients());
  }, [dispatch, successDelete]);

  useEffect(() => {
    if (deleteIngredient) {
      deleteIngredient.success = false;
    }
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [ingredientChosen, setIngredientChosen] = useState();
  const handleClickOpen = (ingredientId) => {
    setOpen(true);
    setIngredientChosen(ingredientId);
  };

  const handleClose = () => {
    setOpen(false);
    setIngredientChosen("");
  };
  const handleRemove = () => {
    setOpen(false);
    dispatch(deletedIngredient(ingredientChosen));
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
            <Paper elevation={3} style={{ padding: "30px" }}>
              <Box display="flex">
                <Box>
                  <Typography
                    variant="h5"
                    style={{ marginBottom: "10px", color: "#052963" }}
                  >
                    INGREDIENTS
                  </Typography>
                </Box>
                <Box ml="auto">
                  <Button
                    variant="contained"
                    className={classes.pink}
                    component={changeURL}
                    to="/admin/ingredient/create"
                  >
                    + Add new ingredient
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
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell align="center">Image</StyledTableCell>
                      <StyledTableCell align="center">Category</StyledTableCell>
                      <StyledTableCell align="center">
                        Description
                      </StyledTableCell>
                      <StyledTableCell align="center">Calo</StyledTableCell>
                      <StyledTableCell align="center">ACTIONS</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ingredients.map((ingredient) => (
                      <StyledTableRow key={ingredient._id}>
                        <StyledTableCell component="th" scope="row">
                          {ingredient.name}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          component="th"
                          scope="row"
                        >
                          <img
                            width="50px"
                            height="50px"
                            src={ingredient.image}
                            alt="ingredient"
                          ></img>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {ingredient.category}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {ingredient.description}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {ingredient.calo}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Button
                                variant="contained"
                                className={classes.pink}
                                onClick={() =>
                                  history.push(
                                    `/admin/ingredient/${ingredient._id}`
                                  )
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
                                onClick={() => handleClickOpen(ingredient._id)}
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

export default Ingredients;
