
import { Box, Button, Divider, FormControlLabel, Grid, Paper, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as changeURL, useHistory } from "react-router-dom";
import { savePaymentMethod } from '../../actions/cartActions';
import CartNav from '../CartNav/CartNav';
import useStyle from './styles.js';
const Payment = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const userSignIn = useSelector(state => state.userSignIn)
    const { shippingAddress, paymentMethod } = useSelector(state => state.cart)
    const classes = useStyle()
    const { userInfo } = userSignIn
    if (!userInfo) {
        history.push('/signin')
    }
    if (!shippingAddress.address) {
        history.push('/shipping')
    }
    const cartItemsOld = useSelector((state) => state.cart.cartItems);

    const [value, setValue] = useState(paymentMethod || 'COD');

    const handleOnChange = (e) => {
        setValue(e.target.value);
    }

    const handleOnSubmit = () => {
        dispatch(savePaymentMethod(value));
        history.push('/placeorder')
    }

    const subTotal = (cartItemsOld.length !== 0 ? (cartItemsOld
        .map((item) => +item.price * +item.qty)
        .reduce((a, b) => a + b)) : 0)
    const tax = subTotal * 10 / 100
    const total = tax + subTotal
    if (cartItemsOld.length === 0) {
        history.push('/cart')
    }
    return (
        <Box mt={3}>
            <Box ml={6} mr={6}>
                <Grid container  >
                    <Grid item xs={12} md={9} className={classes.cartNav}>
                        <CartNav current={3} />
                    </Grid>
                </Grid>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={9}>
                        <Box marginBottom={3}>
                            <Paper elevation={3} style={{ padding: '50px' }}>
                                <FormControl component="fieldset" style={{ width: '100%' }}>
                                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleOnChange} >
                                        <FormControlLabel value="COD" control={<Radio />} label="Cash On Delivery" />
                                        <Box my={5} style={{ width: '100%' }}>
                                            <Divider variant="middle"></Divider>
                                        </Box>
                                        <FormControlLabel value="Momo" control={<Radio />} label="Pay with MoMo" />
                                        {value === "Momo" &&
                                            <Box display="flex" justifyContent="center" >
                                                <img alt="logo" src="/momo.png" width="40%" className={classes.picture} />
                                            </Box>
                                        }
                                    </RadioGroup>
                                </FormControl>
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
                                            to="/shipping"
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
                                            Continue
                                        </Button>
                                    </Grid>
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

export default Payment
