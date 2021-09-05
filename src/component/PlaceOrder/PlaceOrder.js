import { Box, Button, CircularProgress, Divider, Grid, Paper, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as changeURL, useHistory } from "react-router-dom";
import { createOrder } from '../../actions/orderActions';
import { ORDER_CREATE_RESET } from '../../constants/orderConstants';
import CartNav from '../CartNav/CartNav';
import useStyles from './styles';
const PlaceOrder = () => {
    const history = useHistory()
    const classes = useStyles()
    const dispatch = useDispatch()
    const userSignIn = useSelector(state => state.userSignIn)
    const { shippingAddress, paymentMethod, cartItems } = useSelector(state => state.cart)
    const cart = useSelector((state) => state.cart);
    const { userInfo } = userSignIn
    const orderCreate = useSelector(state => state.orderCreate)
    const { loading, success, error, order } = orderCreate
    if (!userInfo) {
        history.push('/signin')
    }
    if (!shippingAddress.address) {
        history.push('/shipping')
    }
    if (!paymentMethod) {
        history.push('/payment')
    }

    const handleOnSubmit = () => {
        dispatch(createOrder({ ...cart, orderItems: cartItems }));
    }
    const subTotal = (cartItems.length !== 0 ? (cartItems
        .map((item) => +item.price * +item.qty)
        .reduce((a, b) => a + b)) : 0)
    cart.itemsPrice = subTotal
    const tax = subTotal * 10 / 100
    cart.taxPrice = tax
    const total = tax + subTotal
    cart.totalPrice = total

    if (cartItems.length === 0) {
        history.push('/cart')
    }
    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [success, dispatch, history, order])
    return (
        <Box mt={3}>
            <Box ml={6} mr={6}>
                <Grid container  >
                    <Grid item xs={12} md={9} className={classes.cartNav}>
                        <CartNav current={4} />
                    </Grid>
                </Grid>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={9}>
                        <Box marginBottom={3}>
                            <Paper elevation={3} style={{ padding: '30px' }}>
                                <Typography variant="h6" style={{ color: '#f73471' }}>Shipping</Typography>
                                <Box mt={2}>
                                    <Typography gutterBottom><span style={{ fontWeight: '700' }}>Name: </span > {shippingAddress.name}</Typography>
                                    <Typography gutterBottom><span style={{ fontWeight: '700' }}>Address: </span > {shippingAddress.address}, {shippingAddress.ward}, District {shippingAddress.district}, {shippingAddress.city}, {shippingAddress.country}</Typography>
                                </Box>
                            </Paper>
                        </Box>
                        <Box marginBottom={3}>
                            <Paper elevation={3} style={{ padding: '30px' }}>
                                <Typography variant="h6" style={{ color: '#f73471' }}>Payment</Typography>
                                <Box mt={2}>
                                    <Typography gutterBottom><span style={{ fontWeight: '700' }}>Method: </span > {paymentMethod}</Typography>
                                </Box>
                            </Paper>
                        </Box>
                        <Box marginBottom={3}>
                            <Paper elevation={3} style={{ padding: '30px' }}>
                                <Typography variant="h6" style={{ color: '#f73471' }}>Order Items</Typography>
                                <Box mt={2}>
                                    {cartItems.map(item => (
                                        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                                            <img alt="product" src={item.image} width="100" height="100" />
                                            <Typography>{item.name}</Typography>
                                            <Typography>{item.qty} x ${item.price} = ${item.price * item.qty}</Typography>
                                        </Box>
                                    ))}

                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Paper>
                            <Box p={2}>
                                <Grid container>
                                    <Grid item xs="6" container justifyContent="flex-start">
                                        <Grid item>
                                            <Typography variant="h6">Subtotal:</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs="6" container justifyContent="flex-end">
                                        <Grid item>
                                            <Typography variant="h6">
                                                $
                                                {subTotal}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs="6" container justifyContent="flex-start">
                                        <Grid item>
                                            <Typography variant="h6">Tax:</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs="6" container justifyContent="flex-end">
                                        <Grid item>
                                            <Typography variant="h6">
                                                $
                                                {tax}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs="6" container justifyContent="flex-start">
                                        <Grid item>
                                            <Typography variant="h6">Shipping:</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs="6" container justifyContent="flex-end">
                                        <Grid item>
                                            <Typography variant="h6">
                                                free
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Box my={2}>
                                    <Divider variant="middle"></Divider>
                                </Box>
                                <Grid container>
                                    <Grid item xs="12" container justifyContent="flex-end">
                                        <Grid item>
                                            <Typography variant="h5">
                                                $
                                                {total}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid item xs="12" md="6">
                                        <Button
                                            component={changeURL}
                                            to="/payment"
                                            variant="outlined"
                                            color="secondary"
                                            style={{ width: "100%" }}
                                        >
                                            Back
                                        </Button>
                                    </Grid>
                                    <Grid item xs="12" md="6">
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            style={{ width: "100%" }}
                                            onClick={handleOnSubmit}
                                        >
                                            Order
                                        </Button>
                                    </Grid>
                                    {loading && <CircularProgress color="secondary" />}
                                    {error && <Alert severity="error">{error}</Alert>}
                                </Grid>

                            </Box>
                        </Paper>
                    </Grid>

                    {/* END RIGHT SIDE */}
                </Grid>
            </Box>
        </Box>
    )
}

export default PlaceOrder

