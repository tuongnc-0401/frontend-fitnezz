import { Box, Button, CircularProgress, Container, CssBaseline, Grid, TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createdProduct } from '../../../actions/productActions';
import useStyles from './styles';
import { Link as changeURL } from "react-router-dom";
const CreateProduct = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const [productData, setProductData] = useState({
        name: '', image: '', brand: '', category: '', description: '', price: null, rating: null, numReviews: null
    });
    const [errorRating, setErrorRating] = useState(false)
    const newProduct = useSelector(state => state.newProduct)
    const { loading, success, error } = newProduct
    const handleSubmit = (e) => {
        e.preventDefault()
        if (productData.rating <= 5) {
            setErrorRating(false)
            dispatch(createdProduct(productData))
        } else {
            setErrorRating(true)
        }
    }
    useEffect(() => {
        if (newProduct) {
            newProduct.success = false
        }
    }, [newProduct])
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    CREATE NEW PRODUCT
                </Typography>
                {loading && <CircularProgress style={{ marginTop: '10px' }} color="secondary" />}
                {error && <Alert style={{ marginTop: '10px' }} severity="error">{error}</Alert>}
                {errorRating && <Alert style={{ marginTop: '10px' }} severity="error">Rating is just from 0 to 5</Alert>}
                {success && <Box display="flex" mt={2}>
                    <Alert elevation={2} severity="success" fullWidth>Success </Alert>

                </Box>}
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <TextField autoComplete="name" autoFocus margin="normal" name="name" variant="outlined" label="Name" fullWidth value={productData.name} onChange={(e) => setProductData({ ...productData, name: e.target.value })}></TextField>
                    <TextField margin="normal" name="brand" variant="outlined" label="Brand" fullWidth value={productData.brand} onChange={(e) => setProductData({ ...productData, brand: e.target.value })}></TextField>
                    <TextField margin="normal" name="category" variant="outlined" label="Category" fullWidth value={productData.category} onChange={(e) => setProductData({ ...productData, category: e.target.value })}></TextField>
                    <TextField multiline margin="normal" name="description" variant="outlined" label="Description" fullWidth value={productData.description} onChange={(e) => setProductData({ ...productData, description: e.target.value })}></TextField>
                    <TextField margin="normal" name="price" type="Number" variant="outlined" label="Price" fullWidth value={productData.price} onChange={(e) => setProductData({ ...productData, price: +e.target.value })}></TextField>
                    <TextField margin="normal" name="rating" type="Number" variant="outlined" label="Rating" fullWidth value={productData.rating} onChange={(e) => setProductData({ ...productData, rating: +e.target.value })}></TextField>
                    <TextField margin="normal" name="numReviews" type="Number" variant="outlined" label="Num Reviews" fullWidth value={productData.numReviews} onChange={(e) => setProductData({ ...productData, numReviews: +e.target.value })}></TextField>
                    <div>
                        <FileBase type="file" multiple={false} onDone={({ base64 }) => setProductData({ ...productData, image: base64 })}>
                        </FileBase>
                    </div>
                    {productData?.image && (
                        <div>
                            < img src={productData.image} width="50%" alt="productimage" />
                        </div>)}
                    <Grid container spacing={1} style={{ marginTop: "5px" }}>
                        <Grid item xs="12" md="6">
                            <Button component={changeURL} to="/admin/product/" variant="outlined" fullWidth>Go Back</Button>
                        </Grid>
                        <Grid item xs="12" md="6">
                            <Button style={{ backgroundColor: '#f73471' }}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"

                            >
                                Create
                            </Button>
                        </Grid>
                    </Grid>

                </form>
            </div>
        </Container >


    )
}

export default CreateProduct
