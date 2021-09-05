import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Grid,
    IconButton, Link, Paper, Snackbar, Typography, Tooltip
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as goBackCart } from "react-router-dom";
import { removeAllItems, removeCartItems, updateCartItems } from "../../actions/cartActions";
import useStyles from "./styles";
import {
    Dialog, DialogActions,
    DialogTitle,
    Slide
} from '@material-ui/core';
import CartNav from "../CartNav/CartNav";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Cart = () => {
    const classes = useStyles();
    const cartItemsOld = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const [errorQuantity, setErrorQuantity] = useState(false);
    const [removeItem, setRemoveItem] = useState(null)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorQuantity(false);
    };

    const handleUpdateItem = (item, qty) => {
        dispatch(updateCartItems(item, qty));
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose1 = () => {
        setOpen(false);
        setRemoveItem(null)
    };



    if (cartItemsOld.length === 0) {
        return (
            <Box mt={3} m={3}>
                <Alert severity="error">
                    Your Cart is Empty!{" "}
                    <Link component={goBackCart} to="/products">
                        Go back the product
                    </Link>
                </Alert>
            </Box>
        );
    } else {
        return (

            <Box mt={3}>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose1}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{removeItem ? "Do you want to remove this product" : "Do you want to remove all the products"}</DialogTitle>
                    <DialogActions>
                        <Button variant="outlined" onClick={() => {
                            handleClose1()
                        }} color="primary">
                            Disagree
                        </Button>
                        <Button variant="contained" onClick={() => {
                            if (removeItem) {
                                handleClose1()
                                dispatch(removeCartItems(removeItem))
                                setRemoveItem(null)
                            } else {
                                dispatch(removeAllItems())
                            }
                        }} color="secondary">
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar open={errorQuantity} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        Can not choose 0 quantity!
                    </Alert>
                </Snackbar>

                <Box ml={6} mr={6}>
                    <Grid container  >
                        <Grid item xs={12} md={9} className={classes.cartNav}>
                            <CartNav current={1} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={9}>
                            <Box marginBottom={3}>
                                <Paper elevation={3}>
                                    <Box>
                                        <Grid container alignItems="center">
                                            <Grid item xs="2" className={classes.displayNone}></Grid>
                                            <Grid item xs="2" container className={classes.displayNone}>
                                                <Grid item>
                                                    <Typography
                                                        variant="h6"
                                                        style={{ color: "deepPink" }}
                                                    >
                                                        Name
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs="2" container className={classes.displayNone}>
                                                <Grid item mx="auto">
                                                    <Typography
                                                        variant="h6"
                                                        style={{ color: "deepPink" }}
                                                    >
                                                        Unit Price
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs="3" container className={classes.displayNone}>
                                                <Grid item mx="auto">
                                                    <Typography
                                                        variant="h6"
                                                        style={{ color: "deepPink" }}
                                                    >
                                                        Quantity
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs="2" container className={classes.displayNone}>
                                                <Grid item mx="auto">
                                                    <Typography
                                                        variant="h6"
                                                        style={{ color: "deepPink" }}
                                                    >
                                                        Total Price
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs="12" lg={1} container alignItems="center" >
                                                <Grid item mx="auto">
                                                    <Tooltip title="Remove all items">
                                                        <IconButton onClick={handleClickOpen} aria-label="delete">
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Grid>
                                                <Typography style={{ color: "#f73471" }} className={classes.displayText}>Remove all items</Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Paper>
                            </Box>
                            {/* LIST ALL ITEMS IN CART */}
                            {cartItemsOld.map((item) => (
                                <Box marginBottom={3}>
                                    <Paper elevation={3}>
                                        <Box p={2}>
                                            <Grid container alignItems="center" spacing={1}>
                                                <Grid item lg="2" xs={2} >
                                                    <img
                                                        src={item.image}
                                                        alt="hihi"
                                                        width="100%"

                                                    ></img>
                                                </Grid>
                                                <Grid item lg="2" xs={10}>

                                                    <Typography variant="h5">{item.name}</Typography>

                                                </Grid>
                                                <Grid item lg="2" xs={3} container justifyContent="center">
                                                    <Grid item mx="auto">
                                                        <Typography variant="h5">${item.price}</Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid item lg="3" xs={3} container justifyContent="center">
                                                    <Grid item mx="auto">
                                                        <ButtonGroup>
                                                            <Button
                                                                onClick={(e) => {
                                                                    if (item.qty > 1) {
                                                                        handleUpdateItem(item, +item.qty - 1)
                                                                    }
                                                                }}
                                                                style={{
                                                                    border: "1px solid pink",
                                                                    fontSize: "20px",
                                                                }}
                                                            >
                                                                -
                                                            </Button>
                                                            <input
                                                                className={classes.input}
                                                                type="number"
                                                                name="qty"
                                                                value={item.qty === 0 ? null : item.qty}

                                                                onChange={(e) => {
                                                                    handleUpdateItem(item, +e.target.value)
                                                                }}
                                                                onBlur={(e) => {
                                                                    if (+(e.target.value) === 0) {
                                                                        handleUpdateItem(item, 1)
                                                                        setErrorQuantity(true)
                                                                    }
                                                                }}
                                                                style={{
                                                                    width: "40px",
                                                                    border: "1px solid pink",
                                                                    fontSize: "20px",

                                                                    textAlign: "center",
                                                                }}
                                                            ></input>
                                                            <Button
                                                                onClick={(e) =>
                                                                    handleUpdateItem(item, +item.qty + 1)
                                                                }
                                                                style={{
                                                                    border: "1px solid pink",
                                                                    fontSize: "20px",
                                                                }}
                                                            >
                                                                +
                                                            </Button>
                                                        </ButtonGroup>
                                                    </Grid>
                                                </Grid>
                                                <Grid item lg="2" xs={3} container justifyContent="center">
                                                    <Grid item mx="auto">
                                                        <Typography variant="h5">
                                                            ${item.price * item.qty}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid item lg="1" xs={3} container justifyContent="center">
                                                    <Grid item mx="auto">
                                                        <IconButton onClick={() => {
                                                            handleClickOpen()
                                                            setRemoveItem(item)
                                                        }}>
                                                            <DeleteIcon></DeleteIcon>
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Paper>
                                </Box>
                            ))}
                        </Grid>

                        {/* RIGHT SIDE TOTAL PRICE */}
                        <Grid item xs={12} md={3}>
                            <Paper>
                                <Box p={2}>
                                    <Grid container>
                                        <Grid item xs="6" container justifyContent="flex-start">
                                            <Grid item>
                                                <Typography variant="h5">Total</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs="6" container justifyContent="flex-end">
                                            <Grid item>
                                                <Typography variant="h5">
                                                    $
                                                    {cartItemsOld
                                                        .map((item) => +item.price * +item.qty)
                                                        .reduce((a, b) => a + b)}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Box my={2}>
                                        <Divider variant="middle"></Divider>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        style={{ width: "100%" }}
                                        component={goBackCart}
                                        to="/signin?require=shipping"
                                    >
                                        CHECK OUT
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>

                        {/* END RIGHT SIDE */}
                    </Grid>
                </Box>
            </Box >
        );
    }
};

export default Cart;
