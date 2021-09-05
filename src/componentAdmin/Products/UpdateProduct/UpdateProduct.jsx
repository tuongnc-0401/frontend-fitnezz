import {
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { Link as changeURL, useParams } from "react-router-dom";
import {
  detailsProduct,
  updatedProduct,
} from "../../../actions/productActions";
import { PRODUCT_DETAILS_RESET } from "../../../constants/productConstants";
import useStyles from "./styles";

const UpdateProduct = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [errorRating, setErrorRating] = useState(false);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const updateProduct = useSelector((state) => state.updateProduct);
  const { loading: updateLoading, error: updateError, success } = updateProduct;
  const [productData, setProductData] = useState({
    name: "",
    image: "",
    brand: "",
    category: "",
    description: "",
    price: null,
    rating: null,
    numReviews: null,
  });
  const { id } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (productData.rating <= 5) {
      setErrorRating(false);
      dispatch(updatedProduct(productData));
    } else {
      setErrorRating(true);
    }
  };
  useEffect(() => {
    dispatch({ type: PRODUCT_DETAILS_RESET });
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (updateProduct) {
      updateProduct.success = false;
    }
  }, [updateProduct]);
  useEffect(() => {
    if (
      product &&
      Object.keys(product).length === 0 &&
      product.constructor === Object
    ) {
      dispatch(detailsProduct(id));
    }
    setProductData(product);
  }, [dispatch, id, product]);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          UPDATE NEW PRODUCT
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
            {errorRating && (
              <Alert style={{ marginTop: "10px" }} severity="error">
                Rating is just from 0 to 5
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
              value={productData?.name}
              onChange={(e) =>
                setProductData({ ...productData, name: e.target.value })
              }
            ></TextField>
            <TextField
              margin="normal"
              name="brand"
              variant="outlined"
              label="Brand"
              fullWidth
              value={productData?.brand}
              onChange={(e) =>
                setProductData({ ...productData, brand: e.target.value })
              }
            ></TextField>
            <TextField
              margin="normal"
              name="category"
              variant="outlined"
              label="Category"
              fullWidth
              value={productData?.category}
              onChange={(e) =>
                setProductData({ ...productData, category: e.target.value })
              }
            ></TextField>
            <TextField
              multiline
              margin="normal"
              name="description"
              variant="outlined"
              label="Description"
              fullWidth
              value={productData?.description}
              onChange={(e) =>
                setProductData({ ...productData, description: e.target.value })
              }
            ></TextField>
            <TextField
              margin="normal"
              name="price"
              type="Number"
              variant="outlined"
              label="Price"
              fullWidth
              value={productData?.price}
              onChange={(e) =>
                setProductData({ ...productData, price: +e.target.value })
              }
            ></TextField>
            <TextField
              margin="normal"
              name="rating"
              type="Number"
              variant="outlined"
              label="Rating"
              fullWidth
              value={productData?.rating}
              onChange={(e) =>
                setProductData({ ...productData, rating: +e.target.value })
              }
            ></TextField>
            <TextField
              margin="normal"
              name="numReviews"
              type="Number"
              variant="outlined"
              label="Num Reviews"
              fullWidth
              value={productData?.numReviews}
              onChange={(e) =>
                setProductData({ ...productData, numReviews: +e.target.value })
              }
            ></TextField>
            <div>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setProductData({ ...productData, image: base64 })
                }
              ></FileBase>
            </div>
            {productData?.image && (
              <div>
                <img src={productData.image} width="50%" alt="productimage" />
              </div>
            )}
            <Grid container spacing={1} style={{ marginTop: "5px" }}>
              <Grid item xs="12" md="6">
                <Button
                  component={changeURL}
                  to="/admin/product/"
                  onClick={() => dispatch({ type: PRODUCT_DETAILS_RESET })}
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

export default UpdateProduct;
