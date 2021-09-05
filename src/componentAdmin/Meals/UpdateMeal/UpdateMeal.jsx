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
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { Link as changeURL, useParams } from "react-router-dom";
import { listIngredients } from "../../../actions/ingredientActions";
import { detailsMeal, updatedMeal } from "../../../actions/mealAction";
import { MEAL_DETAILS_RESET } from "../../../constants/mealConstants";
import useStyles from "./styles";

const UpdateMeal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ingredientList = useSelector((state) => state.ingredientList);
  const { ingredients } = ingredientList;
  const mealDetails = useSelector((state) => state.mealDetails);
  const { loading, error, meal } = mealDetails;
  const updateMeal = useSelector((state) => state.updateMeal);
  const { loading: updateLoading, error: updateError, success } = updateMeal;
  const [mealData, setMealData] = useState({
    name: "",
    image: "",
    type: "",
    instruction: "",
    ingredients: "",
    url: "",
    fruit: "",
    vegetable: "",
    dairy: "",
    grain: "",
    protein: "",
  });
  const { id } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatedMeal(mealData));
  };
  useEffect(() => {
    dispatch({ type: MEAL_DETAILS_RESET });
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    dispatch(listIngredients());
  }, [dispatch]);
  useEffect(() => {
    if (updateMeal) {
      updateMeal.success = false;
    }
  }, [updateMeal]);
  useEffect(() => {
    if (meal && Object.keys(meal).length === 0 && meal.constructor === Object) {
      dispatch(detailsMeal(id));
    }
    setMealData(meal);
  }, [dispatch, id, meal]);

  const handleOnChange = (e) => {
    setMealData({ ...mealData, [e.target.name]: e.target.value });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          UPDATE NEW MEAL
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
                {error}
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
              value={mealData?.name}
              onChange={(e) =>
                setMealData({ ...mealData, name: e.target.value })
              }
            ></TextField>
            <FormControl component="fieldset" style={{ marginTop: "10px" }}>
              <FormLabel component="legend">Category</FormLabel>
              <RadioGroup
                aria-label="type"
                name="type"
                value={mealData?.type || ""}
                onChange={(e) =>
                  setMealData({ ...mealData, type: e.target.value })
                }
              >
                <FormControlLabel
                  value="breakfast"
                  control={<Radio />}
                  label="Breakfast"
                />
                <FormControlLabel
                  value="lunch"
                  control={<Radio />}
                  label="Lunch"
                />
                <FormControlLabel
                  value="dinner"
                  control={<Radio />}
                  label="Dinner"
                />
              </RadioGroup>
            </FormControl>

            <TextField
              multiline
              margin="normal"
              name="instruction"
              variant="outlined"
              label="Instruction"
              fullWidth
              value={mealData?.instruction}
              onChange={(e) =>
                setMealData({ ...mealData, instruction: e.target.value })
              }
            ></TextField>
            <TextField
              multiline
              margin="normal"
              name="ingredients"
              variant="outlined"
              label="Ingredients"
              fullWidth
              value={mealData?.ingredients}
              onChange={(e) =>
                setMealData({ ...mealData, ingredients: e.target.value })
              }
            ></TextField>
            <TextField
              multiline
              margin="normal"
              name="url"
              variant="outlined"
              label="URL"
              fullWidth
              value={mealData?.url}
              onChange={(e) =>
                setMealData({ ...mealData, url: e.target.value })
              }
            ></TextField>
            <Grid container>
              <Grid item xs={12} md={6}>
                <label for="fruit">Choose a fruit: </label>
              </Grid>
              <Grid
                container
                justifyContent="flex-end"
                item
                xs={12}
                md={6}
                style={{ width: "100%" }}
              >
                <select
                  name="fruit"
                  id="fruit"
                  value={mealData?.fruit || ""}
                  onChange={handleOnChange}
                  required
                  style={{ width: "100%" }}
                >
                  <option value="">Select one option</option>
                  {ingredients.map((ingredient, index) => {
                    return ingredient.category === "fruit" ? (
                      <option key={index} value={ingredient._id}>
                        {ingredient.name}
                      </option>
                    ) : null;
                  })}
                </select>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: "10px" }}>
              <Grid item xs={12} md={6}>
                <label for="vegetable">Choose a vegetable: </label>
              </Grid>
              <Grid
                container
                justifyContent="flex-end"
                item
                xs={12}
                md={6}
                style={{ width: "100%" }}
              >
                <select
                  name="vegetable"
                  id="vegetable"
                  value={mealData?.vegetable || ""}
                  onChange={handleOnChange}
                  required
                  style={{ width: "100%" }}
                >
                  <option value="">Select one option</option>
                  {ingredients.map((ingredient, index) => {
                    return ingredient.category === "vegetable" ? (
                      <option key={index} value={ingredient._id}>
                        {ingredient.name}
                      </option>
                    ) : null;
                  })}
                </select>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: "10px" }}>
              <Grid item xs={12} md={6}>
                <label for="dairy">Choose a dairy: </label>
              </Grid>
              <Grid
                container
                justifyContent="flex-end"
                item
                xs={12}
                md={6}
                style={{ width: "100%" }}
              >
                <select
                  name="dairy"
                  id="dairy"
                  value={mealData?.dairy || ""}
                  onChange={handleOnChange}
                  required
                  style={{ width: "100%" }}
                >
                  <option value="">Select one option</option>

                  {ingredients.map((ingredient, index) => {
                    return ingredient.category === "dairy" ? (
                      <option key={index} value={ingredient._id}>
                        {ingredient.name}
                      </option>
                    ) : null;
                  })}
                </select>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: "10px" }}>
              <Grid item xs={12} md={6}>
                <label for="grain">Choose a grain: </label>
              </Grid>
              <Grid
                container
                justifyContent="flex-end"
                item
                xs={12}
                md={6}
                style={{ width: "100%" }}
              >
                <select
                  name="grain"
                  id="grain"
                  value={mealData?.grain || ""}
                  onChange={handleOnChange}
                  required
                  style={{ width: "100%" }}
                >
                  <option value="">Select one option</option>

                  {ingredients.map((ingredient, index) => {
                    return ingredient.category === "grain" ? (
                      <option key={index} value={ingredient._id}>
                        {ingredient.name}
                      </option>
                    ) : null;
                  })}
                </select>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: "10px" }}>
              <Grid item xs={12} md={6}>
                <label for="protein">Choose a protein: </label>
              </Grid>
              <Grid
                container
                justifyContent="flex-end"
                item
                xs={12}
                md={6}
                style={{ width: "100%" }}
              >
                <select
                  name="protein"
                  id="protein"
                  value={mealData?.protein || ""}
                  onChange={handleOnChange}
                  required
                  style={{ width: "100%" }}
                >
                  <option value="">Select one option</option>

                  {ingredients.map((ingredient, index) => {
                    return ingredient.category === "protein" ? (
                      <option key={index} value={ingredient._id}>
                        {ingredient.name}
                      </option>
                    ) : null;
                  })}
                </select>
              </Grid>
            </Grid>
            <div style={{ marginTop: "10px" }}>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setMealData({ ...mealData, image: base64 })
                }
              ></FileBase>
            </div>
            {mealData?.image && (
              <div>
                <img src={mealData.image} width="50%" alt="ingredientimage" />
              </div>
            )}
            <Grid container spacing={1} style={{ marginTop: "5px" }}>
              <Grid item xs="12" md="6">
                <Button
                  component={changeURL}
                  to="/admin/meal/"
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

export default UpdateMeal;
