import { Box, Button, Divider, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link as changeURL, useHistory } from "react-router-dom";
import { saveShippingAddress } from '../../actions/cartActions';
import CartNav from '../CartNav/CartNav';
import useStyles from './styles'
const Shipping = () => {
    const history = useHistory()
    const classes = useStyles()
    const userSignIn = useSelector(state => state.userSignIn)
    const [errorForm, setErrorForm] = useState({})
    const { userInfo } = userSignIn
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    if (!userInfo) {
        history.push('/signin')
    }
    const [form, setForm] = useState({ name: shippingAddress.name, phone: shippingAddress.phone, email: shippingAddress.email, address: shippingAddress.address, ward: shippingAddress.ward, district: shippingAddress.district, city: shippingAddress.city, country: shippingAddress.country })
    const cartItemsOld = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch()

    const handleDataForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleValidation = () => {
        var error = {}
        var validate = true
        if (!form.name) {
            error["name"] = "Name is required"
            validate = false
        } else {
            if (!form.name.match(/^[a-zA-Z\s]+$/)) {
                validate = false;
                error["name"] = "Only letters";
            }
        }
        if (!form.phone) {
            error["phone"] = "Phone is required"
            validate = false
        } else {
            if (!form.phone.match(/^[0-9]{10}$/)) {
                error["phone"] = "Phone must be ten digits"
                validate = false
            }
        }
        if (!form.email) {
            error["email"] = "Email is required"
            validate = false
        } else {
            let lastAtPos = form.email.lastIndexOf('@');
            let lastDotPos = form.email.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && form.email.indexOf('@@') === -1 && lastDotPos > 2 && (form.email.length - lastDotPos) > 2)) {
                error["email"] = "Email is not valid ( must have @ and . )";
                validate = false
            }
        }
        if (!form.address) {
            error["address"] = "Address is required"
            validate = false
        }
        if (!form.ward) {
            error["ward"] = "Ward is required"
            validate = false
        }
        if (!form.city) {
            error["city"] = "City is required"
            validate = false
        }
        if (!form.district) {
            error["district"] = "District is required"
            validate = false
        }
        if (!form.country) {
            error["country"] = "Country is required"
            validate = false
        }
        setErrorForm(error)
        return validate
    }
    const handleOnSubmit = () => {
        if (handleValidation()) {
            dispatch(saveShippingAddress(form))
            history.push('/payment')
        }
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
                        <CartNav current={2} />
                    </Grid>
                </Grid>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={9}>
                        <Box marginBottom={3}>
                            <Paper elevation={3}>
                                <Box>
                                    <Box pt={3}>
                                        <Grid container justifyContent="center">
                                            <Grid items>
                                                <Typography variant="h4" gutterBottom>
                                                    Shipping address
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box ml={6} mr={6}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    id="name"
                                                    name="name"
                                                    label="Name"
                                                    value={form.name}
                                                    onChange={handleDataForm}
                                                    fullWidth
                                                    autoFocus
                                                />
                                                {errorForm?.name && (
                                                    <Alert severity="warning">{errorForm.name}</Alert>
                                                )}
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    id="phone"
                                                    name="phone"
                                                    label="Phone"
                                                    value={form.phone}
                                                    onChange={handleDataForm}
                                                    fullWidth
                                                />
                                                {errorForm?.phone && (
                                                    <Alert severity="warning">{errorForm.phone}</Alert>
                                                )}

                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    id="email"
                                                    name="email"
                                                    label="Email"
                                                    value={form.email}
                                                    onChange={handleDataForm}
                                                    fullWidth
                                                />
                                                {errorForm?.email && (
                                                    <Alert severity="warning">{errorForm.email}</Alert>
                                                )}
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="address"
                                                    name="address"
                                                    label="Address"
                                                    value={form.address}
                                                    onChange={handleDataForm}
                                                    fullWidth
                                                    required
                                                />
                                                {errorForm?.address && (
                                                    <Alert severity="warning">{errorForm.address}</Alert>
                                                )}
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    id="ward"
                                                    name="ward"
                                                    label="Ward"
                                                    value={form.ward}
                                                    onChange={handleDataForm}
                                                    fullWidth
                                                />
                                                {errorForm?.ward && (
                                                    <Alert severity="warning">{errorForm.ward}</Alert>
                                                )}
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField required
                                                    id="district"
                                                    name="district"
                                                    label="District"
                                                    value={form.district}
                                                    onChange={handleDataForm}
                                                    fullWidth />
                                                {errorForm?.district && (
                                                    <Alert severity="warning">{errorForm.district}</Alert>
                                                )}
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    id="city"
                                                    name="city"
                                                    label="City"
                                                    value={form.city}
                                                    onChange={handleDataForm}
                                                    fullWidth
                                                />
                                                {errorForm?.city && (
                                                    <Alert severity="warning">{errorForm.city}</Alert>
                                                )}
                                            </Grid>
                                            <Grid item xs={12} sm={6} style={{ marginBottom: "30px" }}>
                                                <TextField
                                                    required
                                                    id="country"
                                                    name="country"
                                                    label="Country"
                                                    value={form.country}
                                                    onChange={handleDataForm}
                                                    fullWidth
                                                />
                                                {errorForm?.country && (
                                                    <Alert severity="warning">{errorForm.country}</Alert>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Box>
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
                                            to="/cart"
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

export default Shipping
