import { Box, Button, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, withStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/lab/Alert';
import React, { forwardRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as changeURL, useHistory } from 'react-router-dom';
import { deletedProduct, listAllProducts } from '../../actions/productActions';
import useStyles from './styles.js';
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#052963",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Products = () => {
    const dispatch = useDispatch()
    const productListAll = useSelector(state => state.productListAll)
    const { loading, error, products } = productListAll
    const deleteProduct = useSelector(state => state.removeProduct)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = deleteProduct
    const history = useHistory()
    useEffect(() => {
        dispatch(listAllProducts())
    }, [dispatch, successDelete])

    useEffect(() => {
        if (deleteProduct) {
            deleteProduct.success = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const [productChosen, setProductChosen] = useState()
    const handleClickOpen = (productId) => {
        setOpen(true);
        setProductChosen(productId)
    };

    const handleClose = () => {
        setOpen(false);
        setProductChosen("")
    };
    const handleRemove = () => {
        setOpen(false)
        dispatch(deletedProduct(productChosen))

    }
    return (
        <main className={classes.container}>
            {loading ? <CircularProgress color="secondary" />
                : error ? <Alert severity="error">{error}</Alert>
                    : <Grid item xs={12}>
                        <Dialog
                            open={open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle id="alert-dialog-slide-title">{"Delete this item?"}</DialogTitle>

                            <DialogActions>
                                <Button variant="outlined" color="primary" onClick={handleClose}>
                                    Disagree
                                </Button>
                                <Button variant="contained" color="secondary" className={classes.pink} onClick={handleRemove} >
                                    Agree
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Box marginBottom={3}>
                            <Paper elevation={3} style={{ padding: "30px" }}>

                                <Box display="flex">
                                    <Box>
                                        <Typography
                                            variant="h5"
                                            style={{ marginBottom: "10px", color: "#052963" }}
                                        >
                                            PRODUCTS
                                        </Typography>
                                    </Box>
                                    <Box ml="auto">
                                        <Button variant="contained"
                                            className={classes.pink}
                                            component={changeURL}
                                            to="/admin/product/create"
                                        >
                                            + Add new product
                                        </Button>
                                    </Box>

                                </Box>

                                {loadingDelete && <CircularProgress style={{ marginBottom: '10px' }} color="secondary" />}
                                {errorDelete && <Alert style={{ marginBottom: '10px' }} severity="error">{error}</Alert>}
                                {successDelete && <Alert style={{ marginBottom: '10px' }} severity="success">Successfully Delete</Alert>}
                                <TableContainer component={Paper}>
                                    <Table style={{ minWidth: "700" }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Name</StyledTableCell>
                                                <StyledTableCell align="center">Image</StyledTableCell>
                                                <StyledTableCell align="center">Brand</StyledTableCell>
                                                <StyledTableCell align="center">Category</StyledTableCell>
                                                <StyledTableCell align="center">Description</StyledTableCell>
                                                <StyledTableCell align="center">Price</StyledTableCell>
                                                <StyledTableCell align="center">Rating</StyledTableCell>
                                                <StyledTableCell align="center">Number Reviews</StyledTableCell>
                                                <StyledTableCell align="center">ACTIONS</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {products.map((product) => (
                                                <StyledTableRow key={product._id}>
                                                    <StyledTableCell component="th" scope="row">
                                                        {product.name}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center" component="th" scope="row">
                                                        <img width="50px" height="50px" src={product.image} alt="product"></img>
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">{product.brand}</StyledTableCell>
                                                    <StyledTableCell align="center">{product.category}</StyledTableCell>
                                                    <StyledTableCell align="center">{product.description}</StyledTableCell>
                                                    <StyledTableCell align="center">{product.price}</StyledTableCell>
                                                    <StyledTableCell align="center">{product.rating}</StyledTableCell>
                                                    <StyledTableCell align="center">{product.numReviews}</StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12}>
                                                                <Button
                                                                    variant="contained"
                                                                    className={classes.pink}
                                                                    onClick={() => history.push(`/admin/product/${product._id}`)}
                                                                    fullWidth
                                                                >
                                                                    Update
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12}>
                                                                <Button variant="contained"
                                                                    className={classes.pink}
                                                                    onClick={() => handleClickOpen(product._id)}
                                                                    fullWidth
                                                                >
                                                                    Remove
                                                                </Button>
                                                            </Grid>
                                                        </Grid>


                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Box>
                    </Grid>
            }
        </main >
    )
}

export default Products
