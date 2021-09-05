import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Link,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listIngredients } from "../../actions/ingredientActions";
import Ingredient from "./Ingredient/Ingredient";
import useStyles from "./styles";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import {
  removeCartIngredient,
  updateCartIngredient,
} from "../../actions/cartIngredientActions";
import { getOneUserBMI } from "../../actions/calculatorActions";
import { Link as goBackBMI } from "react-router-dom";

const Ingredients = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const ingredientList = useSelector((state) => state.ingredientList);
  const { loading, error, ingredients } = ingredientList;
  const cartIngredient = useSelector((state) => state.cartIngredient);
  const { cartIngredients } = cartIngredient;
  const userBMIList = useSelector((state) => state.getUserBMI);
  const { loading: loadingBMI, error: errorBMI, userBMI } = userBMIList;

  const [errQuantity, setErrQuantity] = useState(false);
  const [search, setSearch] = useState("");
  const [searchIngredient, setSearchIngredient] = useState([]);
  const [filter, setFilter] = useState("all");

  const total = cartIngredients
    .reduce((a, b) => a + b.qty * b.calo, 0)
    .toFixed(2);
  if (userBMI) {
    var caloriesBMI = !userBMI.caloGainLoss
      ? Math.ceil(parseInt(userBMI.numTDEE) / 3)
      : Math.ceil(parseInt(userBMI.caloGainLoss) / 3);
  }

  const handleUpdateIngredient = (ingredient, qty) => {
    dispatch(updateCartIngredient(ingredient, qty));
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setSearch("");
    setSearchIngredient(
      ingredients.filter((ingredient) => {
        if (event.target.value === "all") return true;
        return ingredient.category === event.target.value;
      })
    );
  };

  const handleSearchChange = (e) => {
    var searchIngredient = ingredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchIngredient(searchIngredient);
    setFilter("all");
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErrQuantity(false);
  };

  useEffect(() => {
    dispatch(listIngredients());
    dispatch(getOneUserBMI());
  }, [dispatch]);

  useEffect(() => {
    setSearchIngredient(ingredients);
  }, [ingredients]);

  if (userBMI === "") {
    return (
      <Box mt={3} m={3}>
        <Alert severity="error">
          Please calculate your BMI before visiting the ingredients page!{" "}
          <Link component={goBackBMI} to="/calculator">
            Go back to calculator
          </Link>
        </Alert>
      </Box>
    );
  } else {
    return (
      <main className={classes.container}>
        {loading || loadingBMI ? (
          <CircularProgress color="secondary" />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <Snackbar
              open={errQuantity}
              autoHideDuration={3000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity="error">
                Can not choose 0 quantity!
              </Alert>
            </Snackbar>
            <Paper className={classes.filter}>
              <InputLabel
                id="demo-simple-select-label"
                className={classes.pink}
              >
                FILTER
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth
                onChange={handleFilterChange}
                value={filter}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="grain">Grain</MenuItem>
                <MenuItem value="dairy">Dairy</MenuItem>
                <MenuItem value="fruit">Fruit</MenuItem>
                <MenuItem value="vegetable">Vegetable</MenuItem>
                <MenuItem value="protein">Protein</MenuItem>
              </Select>
            </Paper>
            <Grid container spacing={3} className={classes.gridContainer}>
              <Grid item xs={12} sm={6} md={8} lg={9}>
                <Grid container spacing={3}>
                  {searchIngredient.map((ingredient) => {
                    const disable = cartIngredients.find(
                      (x) => x.ingredient === ingredient._id
                    );
                    return (
                      <Grid item xs={12} sm={12} md={6} lg={4}>
                        <Ingredient ingredient={ingredient} disable={disable} />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} className={classes.fixed}>
                <Paper
                  elevation={3}
                  style={{
                    marginBottom: "5px",
                    padding: "5px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    size="small"
                    style={{ padding: "2px" }}
                    required
                    variant="outlined"
                    id="search"
                    name="search"
                    label="Search"
                    value={search}
                    onChange={(e) => {
                      handleSearchChange(e);
                      setSearch(e.target.value);
                    }}
                    fullWidth
                  />
                  <Box style={{ padding: "2px" }}>
                    <SearchIcon />
                  </Box>
                </Paper>
                <Paper
                  elevation={3}
                  style={{ height: "295px", overflowY: "scroll" }}
                >
                  <Typography
                    variant="h6"
                    className={classes.pink}
                    style={{ textAlign: "center", marginTop: "5px" }}
                  >
                    INGREDIENT LIST
                  </Typography>
                  {cartIngredients.length === 0 ? (
                    <Box p={2}>
                      <Typography variant="body1">
                        Add ingredients you prefer to this list to calculate the
                        calories
                      </Typography>
                    </Box>
                  ) : (
                    cartIngredients.map((ingredient) => (
                      <Paper
                        style={{ display: "flex", margin: "10px" }}
                        elevation={2}
                      >
                        <img
                          src={ingredient.image}
                          width={75}
                          height={75}
                          alt="ingredientimage"
                        />
                        <Box style={{ flexGrow: "1" }} p={1}>
                          <Box display="flex">
                            <Box style={{ fontWeight: "500" }}>
                              {ingredient.name}
                            </Box>
                            <ClearIcon
                              onClick={() =>
                                dispatch(removeCartIngredient(ingredient))
                              }
                              style={{
                                fontSize: "15px",
                                width: "21px",
                                height: "21px",
                                marginLeft: "auto",
                                textAlign: "center",
                                cursor: "pointer",
                              }}
                            >
                              X
                            </ClearIcon>
                          </Box>
                          <Box display="flex" alignItems="center" mt={2}>
                            <input
                              className={classes.input}
                              type="number"
                              style={{ width: "50px", marginRight: "auto" }}
                              value={
                                ingredient.qty === 0 ? null : ingredient.qty
                              }
                              onChange={(e) => {
                                handleUpdateIngredient(
                                  ingredient,
                                  +e.target.value
                                );
                              }}
                              onBlur={(e) => {
                                if (+e.target.value === 0) {
                                  handleUpdateIngredient(ingredient, 1);
                                  setErrQuantity(true);
                                }
                              }}
                            ></input>
                            <Box className={classes.pink}>
                              {(ingredient.calo * ingredient.qty).toFixed(2)}
                              kcal
                            </Box>
                          </Box>
                        </Box>
                      </Paper>
                    ))
                  )}
                </Paper>
                <Paper
                  style={{
                    marginTop: "5px",
                    backgroundColor: "#f73471",
                    padding: "10px",
                  }}
                  elevation={2}
                >
                  <Box display="flex">
                    <Typography
                      style={{ color: "white", display: "flex", flexGrow: "1" }}
                      variant="h5"
                    >
                      TOTAL:
                    </Typography>
                    <Typography
                      style={{ color: "white", display: "flex" }}
                      variant="h5"
                    >
                      {total}KCAL
                    </Typography>
                  </Box>
                </Paper>
                {loadingBMI ? (
                  <CircularProgress color="secondary" />
                ) : errorBMI ? (
                  <Alert severity="error">{error}</Alert>
                ) : total >= caloriesBMI ? (
                  <Alert style={{ marginTop: "10px" }} severity="warning">
                    Please make your meal under {caloriesBMI} calories
                  </Alert>
                ) : (
                  <Paper style={{ marginTop: "5px", padding: "10px" }}>
                    <Typography variant="h6">
                      Your body status is{" "}
                      <span style={{ color: "#f73471" }}>
                        {userBMI.statusBMI}
                      </span>
                    </Typography>
                    {/* <Typography>{userBMI.caloGainLoss} + {userBMI.numTDEE} + {userBMI.caloGainLoss}</Typography> */}
                    <Typography variant="h6">
                      Please make your meal under{" "}
                      <span style={{ color: "#f73471" }}>{caloriesBMI}</span>{" "}
                      calories
                    </Typography>
                  </Paper>
                )}
              </Grid>
            </Grid>
          </>
        )}
      </main>
    );
  }
};

export default Ingredients;
