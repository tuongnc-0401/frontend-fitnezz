import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { cartAddIngredient } from "../../../actions/cartIngredientActions.js";
import useStyles from "./styles.js";
const Ingredient = ({ ingredient, disable }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleAddToList = () => {
    dispatch(cartAddIngredient(ingredient, 1));
  };
  return (
    <Card className={classes.root} elevation={6}>
      <CardHeader title={ingredient.name} style={{ textAlign: "center" }} />
      <CardMedia
        className={classes.media}
        image={ingredient.image}
        title="Paella dish"
      />
      <CardContent className={classes.cardContent}>
        <Typography
          dangerouslySetInnerHTML={{ __html: ingredient.description }}
          variant="body2"
          color="textSecondary"
          component="p"
        />
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <Typography variant="body1" style={{ color: "#f73471" }}>
          {ingredient.calo} kcal/g
        </Typography>
        <Button
          variant="contained"
          disabled={disable}
          className={classes.button}
          onClick={handleAddToList}
        >
          {disable ? "ADDED" : "ADD TO LIST"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Ingredient;
