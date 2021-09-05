import React, { useEffect, useState } from 'react'
import { Grid, Typography, Button, Snackbar } from '@material-ui/core'
import { detailsProduct } from '../../../../actions/productActions'
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles.js'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import { useParams } from 'react-router-dom';
import { addToCart } from '../../../../actions/cartActions';
const ProductDetail = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [qty, setQty] = useState(1)
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    const classes = useStyles();
    const [successMsg, setSuccessMsg] = useState(false);
    const handleAddToCart = (product, qty) => {
        dispatch(addToCart(product, qty))
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessMsg(false);
    };

    useEffect(() => {
        dispatch(detailsProduct(id))
    }, [dispatch, id])
    return (
        <div>
            <Snackbar open={successMsg} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Add Product To Cart Successfully
                </Alert>
            </Snackbar>
            {
                loading ? <CircularProgress color="secondary" />
                    : error ? <Alert severity="error">{error}</Alert>
                        :
                        <section className={classes.container}>
                            <Grid container spacing={5}>
                                <Grid item md={6} >
                                    <Typography className={classes.imageContain}>
                                        <img className={classes.image} src={product.image} alt="product detail" />
                                    </Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography variant="h4" style={{ marginBottom: "15px" }} className={classes.productName}>{product.name}</Typography>
                                    <Box display="flex" alignItems="center" style={{ marginBottom: "15px" }} >
                                        <Box borderColor="transparent">
                                            <Rating name="read-only" value={product.rating} precision={0.5} readOnly />
                                        </Box>
                                        <Box ml={2} borderColor="transparent" style={{ color: '#f73471' }}>
                                            | {product.numReviews} sold
                                        </Box>
                                    </Box>
                                    <Typography variant="h5" style={{ color: '#f73471', marginBottom: "15px" }}>${product.price}</Typography>
                                    <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body1" className={classes.description} style={{ marginBottom: "30px" }} />
                                    <Box class={classes.buttonContain} >
                                        <Box display="flex" alignItems="center" className={classes.buttons}>
                                            <Button type="button" style={{ fontSize: '13px' }} disabled={qty <= 1 ? true : false} onClick={() => {
                                                setQty(qty - 1)
                                            }
                                            } >-</Button>
                                            <input className={classes.input} value={qty} onChange={(e) => setQty(+(e.target.value))}></input>
                                            <Button type="button" onClick={() => setQty(qty + 1)} style={{ fontSize: '13x' }} >+</Button>
                                        </Box>
                                        <Button variant="contained" onClick={() => {
                                            handleAddToCart(product, qty)
                                            setSuccessMsg(true)
                                        }
                                        } style={{ borderRadius: '20px', backgroundColor: "#f73471", color: '#fff', marginLeft: '1em' }}>Add To Cart</Button>
                                        <Button display="flex" style={{ border: "1px solid #f73471", height: "35px", marginLeft: '1em' }}>
                                            <FavoriteBorderIcon variant="contained" style={{ color: "#f73471" }}>
                                            </FavoriteBorderIcon>
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </section >
            }
        </div >

    )
}

export default ProductDetail
