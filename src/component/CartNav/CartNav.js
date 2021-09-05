import { Box, Button } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import useStyles from './styles'

const CartNav = ({ current }) => {
    const classes = useStyles()
    return (
        <Box
            display="flex"
            mb={5}
            alignItems="center"
        >
            <Button
                component={Link}
                to="/cart"
                variant="contained"
                className={classes.buttonNavActive}
                size="small"
            >
                Cart
            </Button>
            <Box
                className={current >= 2 ? classes.lineActive : classes.line}
            ></Box>
            <Button
                component={Link}
                to="/shipping"
                variant="contained"
                className={current >= 2 ? classes.buttonNavActive : classes.buttonNav}
                size="small"
            >
                Shipping
            </Button>
            <Box
                className={
                    current >= 3 ? classes.lineActive : classes.line
                }
            ></Box>
            <Button
                component={Link}
                to="/payment"
                variant="contained"
                className={current >= 3 ? classes.buttonNavActive : classes.buttonNav

                }
                size="small"
            >
                Payment
            </Button>
            <Box
                className={
                    current === 4 ? classes.lineActive : classes.line
                }
            ></Box>
            {current === 4 ? (
                <Button
                    component={Link}
                    to="/placeorder"
                    variant="contained"
                    className={classes.buttonNavActive}
                    size="small"
                >
                    Review
                </Button>
            ) : (
                <Button

                    variant="contained"
                    className={classes.disabledButton}
                    size="small"
                >
                    Review
                </Button>
            )}

        </Box>

    )
}

export default CartNav