import { Box, Button, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, withStyles } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrderMine } from '../../../actions/orderActions'
import ProfileNav from '../ProfileNav'
import useStyles from './styles'
import { useHistory } from 'react-router-dom'


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#f73471",
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

const OrderHistory = () => {
    const orderMineList = useSelector(state => state.orderMineList)
    const { loading, error, orders } = orderMineList
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listOrderMine())
    }, [dispatch])

    return (
        <Box mt={5.5}>
            <Box ml={6} mr={6}>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={3}>
                        <ProfileNav current={3}></ProfileNav>
                    </Grid>
                    {loading ? (
                        <CircularProgress color="secondary" />
                    ) : error ? (
                        <Alert severity="error">{error}</Alert>
                    ) : (<Grid item xs={12} md={9}>
                        <Box marginBottom={3}>
                            <Paper elevation={3} style={{ padding: "40px" }}>
                                <Typography
                                    variant="h5"
                                    style={{ marginBottom: "10px", color: "#f73471" }}
                                >
                                    Order History
                                </Typography>
                                <TableContainer component={Paper}>
                                    <Table style={{ minWidth: "700" }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>ID</StyledTableCell>
                                                <StyledTableCell align="right">DATE</StyledTableCell>
                                                <StyledTableCell align="right">TOTAL</StyledTableCell>
                                                <StyledTableCell align="right">PAID</StyledTableCell>
                                                <StyledTableCell align="right">DELIVERED</StyledTableCell>
                                                <StyledTableCell align="right">STATUS</StyledTableCell>
                                                <StyledTableCell align="right">ACTIONS</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {orders.map((order) => (
                                                <StyledTableRow key={order._id}>
                                                    <StyledTableCell component="th" scope="row">
                                                        {order._id}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">{order.createdAt.substring(0, 10)}</StyledTableCell>
                                                    <StyledTableCell align="right">{order.totalPrice.toFixed(2)}</StyledTableCell>
                                                    <StyledTableCell align="right">{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</StyledTableCell>
                                                    <StyledTableCell align="right">{order.isDelivered
                                                        ? order.deliveredAt.substring(0, 10)
                                                        : 'No'}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">{order.status}</StyledTableCell>
                                                    <StyledTableCell align="right">
                                                        <Button
                                                            variant="contained"
                                                            className={classes.pink}
                                                            onClick={() => history.push(`/order/${order._id}`)}
                                                        >
                                                            Details
                                                        </Button>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Box>
                    </Grid>)}
                </Grid>
            </Box>
        </Box >
    )
}

export default OrderHistory
