import { Box, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogTitle, Divider, Grid, Paper, Slide, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { forwardRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as changeURL, useParams } from "react-router-dom";
import { detailsOrder, updateOrder } from '../../../actions/orderActions';



const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UpdateOrder = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { order, loading, error } = useSelector((state) => state.orderDetails)
    const orderUpdate = useSelector(state => state.orderUpdate)
    const [checked, setChecked] = useState({ isDelivered: order?.isDelivered, isPaid: order?.isPaid });
    const { success, loading: loadingUpdate, error: errorUpdate } = orderUpdate
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleChange = (e) => {
        setChecked({ ...checked, [e.target.name]: e.target.checked });
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleUpdate = () => {
        setOpen(false)
        dispatch(updateOrder({ id: id, isDelivered: checked.isDelivered, isPaid: checked.isPaid }))
    }
    useEffect(() => {
        orderUpdate.success = false

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (order) {
            setChecked({ isDelivered: order.isDelivered, isPaid: order.isPaid })
        }

    }, [order])
    useEffect(() => {
        dispatch(detailsOrder(id))
    }, [dispatch, id, success])
    return loading ? (
        <CircularProgress color="secondary" />
    ) : error ? (
        <Alert severity="error">{error}</Alert>
    ) : (
        <Box mt={3}>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Do you want to update?"}</DialogTitle>

                <DialogActions>
                    <Button variant="outlined" color="primary" onClick={handleClose}>
                        Disagree
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleUpdate} >
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            <Box Box ml={6} mr={6} >
                <Grid container spacing={5}>
                    <Grid item xs={12} md={9}>
                        <Box marginBottom={3}>
                            {loadingUpdate && <CircularProgress style={{ marginBottom: '10px' }} color="secondary" />}
                            {errorUpdate && <Alert style={{ marginBottom: '10px' }} severity="error">{error}</Alert>}
                            {success && <Alert style={{ marginBottom: '10px' }} severity="success">Successfully Update This Order</Alert>}
                            <Paper elevation={3}>
                                <Box>
                                    <Box ml={6} mr={6}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography variant="h5">Status of Order</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="h5">Status: <span style={{ fontSize: "20px" }}>{order.status}</span>.</Typography>
                                            </Grid>

                                        </Grid>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                        <Box marginBottom={3}>
                            <Paper elevation={3}>
                                <Box>
                                    <Box ml={6} mr={6}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Typography variant="h5">Payment</Typography>
                                            </Grid>
                                            {order.paymentMethod === "COD" || order.status === 'Cancelled' || order.status === "Shipping" || order.status === 'Completed' ? null : (
                                                <Grid item container justifyContent="flex-end" xs={6}>
                                                    <Checkbox
                                                        name="isPaid"
                                                        checked={checked.isPaid ? checked.isPaid : false}
                                                        onChange={handleChange}
                                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                                    />
                                                </Grid>)
                                            }

                                            <Grid item xs={12}>
                                                <Typography variant="h5">Method: <span style={{ fontSize: "20px" }}>{order.paymentMethod}</span>.</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                {order.isPaid ? (<Alert severity="success">Paid at {order.paidAt.slice(0, 10)} {order.paidAt.slice(11, 19)}</Alert>) : (<Alert severity="error">Not Paid</Alert>)}
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                        <Box marginBottom={3}>
                            <Paper elevation={3}>
                                <Box>
                                    <Box ml={6} mr={6}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Typography variant="h5">Shipping</Typography>
                                            </Grid>
                                            {order.status === 'Cancelled' || order.status === 'Completed' ? null :
                                                <Grid item container justifyContent="flex-end" xs={6}>
                                                    <Checkbox
                                                        name="isDelivered"
                                                        checked={checked.isDelivered ? checked.isDelivered : false}
                                                        onChange={handleChange}
                                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                                    />
                                                </Grid>
                                            }
                                            <Grid item xs={12}>
                                                <Typography variant="h5">Address: <span style={{ fontSize: "20px" }}>{order.shippingAddress.address}, {order.shippingAddress.ward}, {order.shippingAddress.district}, {order.shippingAddress.city}, {order.shippingAddress.country}</span>.</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                {order.isDelivered ? (<Alert severity="success">Delivered at {order.deliveredAt.slice(0, 10)} {order.deliveredAt.slice(11, 19)}</Alert>) : (<Alert severity="error">Not Deliveried</Alert>)}
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>

                        <Box marginBottom={3}>
                            <Paper elevation={3}>
                                <Box>
                                    <Box ml={6} mr={6}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography variant="h5">Order Items</Typography>
                                            </Grid>
                                            {order.orderItems.map((item) => (
                                                <Grid item xs={12}>
                                                    <Grid container alignItems="center">
                                                        <Grid item xs="4">
                                                            <img
                                                                src={item.image}
                                                                alt="hihi"
                                                                width="40%"
                                                                height="40%"
                                                            ></img>
                                                        </Grid>
                                                        <Grid item xs="4" container justifyContent="center">
                                                            <Grid item>
                                                                <Typography variant="h5">{item.name}</Typography>
                                                            </Grid>
                                                        </Grid>

                                                        <Grid item xs="4" container justifyContent="flex-end">
                                                            <Grid item mx="auto">
                                                                <Typography variant="h5">
                                                                    {item.qty} x ${item.price} = ${item.price * item.qty}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>

                                                    </Grid>
                                                </Grid>
                                            ))}
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
                                                {order.itemsPrice}
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
                                                {order.taxPrice}
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
                                                {order.totalPrice}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={1}>
                                    <Grid item xs="12">
                                        <Button
                                            component={changeURL}
                                            to="/admin/order"
                                            variant="outlined"
                                            color="secondary"
                                            style={{ width: "100%" }}
                                        >
                                            Back to history
                                        </Button>
                                    </Grid>
                                    {(order.status === "Cancelled" || order.status === "Completed") ? null :
                                        <Grid item xs="12">
                                            <Button
                                                onClick={handleClickOpen}
                                                variant="contained"
                                                color="secondary"
                                                style={{ width: "100%" }}
                                            >
                                                Update
                                            </Button>
                                        </Grid>
                                    }



                                </Grid>

                            </Box>
                        </Paper>
                    </Grid>

                    {/* END RIGHT SIDE */}
                </Grid>
            </Box>
        </Box >
    )
}

export default UpdateOrder
