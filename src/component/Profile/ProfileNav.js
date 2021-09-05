import { Avatar, Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link as changeURL, useHistory, useLocation } from "react-router-dom";
import useStyles from './styles'

const ProfileNav = ({ current }) => {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()
    const { userInfo } = useSelector(state => state.userSignIn)
    if (!userInfo) {
        history.push(`/signin?redirect=${location.pathname.slice(1)}`)
    }
    return (
        <Paper>
            <Box p={2}>
                <Grid container>
                    <Grid item xs="4" container justifyContent="center">
                        <Grid item>
                            <Avatar className={classes.pink}>{userInfo?.name.charAt(0)}
                            </Avatar>
                        </Grid>
                    </Grid>
                    <Grid item xs="8" container>
                        <Grid item xs="12">
                            The Account of
                        </Grid>
                        <Grid item xs="12">
                            <Typography variant="h5">{userInfo?.name}</Typography>

                        </Grid>
                    </Grid>
                </Grid>

                <Grid container spacing={2} style={{ marginTop: "10px" }}>

                    <Grid item xs="12" >
                        <Button
                            component={changeURL}
                            to="/userprofile"
                            variant={current === 1 && "contained"}
                            className={current === 1 && classes.pink}

                            style={{ width: "100%" }}
                        >
                            <Grid container alignItems="center">
                                <Grid item xs="4" container justifyContent="center">
                                    <AccountCircleIcon />
                                </Grid>
                                <Grid item xs="8" container justifyContent="flex-start">
                                    <Typography>Account Info</Typography>
                                </Grid>
                            </Grid>
                        </Button>
                    </Grid>
                    <Grid item xs="12" >
                        <Button
                            component={changeURL}
                            to="/healthhistory"
                            variant={current === 2 && "contained"}
                            className={current === 2 && classes.pink}

                            style={{ width: "100%" }}
                        >
                            <Grid container alignItems="center">
                                <Grid item xs="4" container justifyContent="center">
                                    <MenuBookIcon />
                                </Grid>
                                <Grid item xs="8" container justifyContent="flex-start">
                                    <Typography>Health history</Typography>
                                </Grid>
                            </Grid>
                        </Button>
                    </Grid>
                    <Grid item xs="12" >
                        <Button
                            component={changeURL}
                            to="/orderhistory"
                            variant={current === 3 && "contained"}
                            className={current === 3 && classes.pink}

                            style={{ width: "100%" }}
                        >
                            <Grid container alignItems="center">
                                <Grid item xs="4" container justifyContent="center">
                                    <ShoppingBasketIcon />
                                </Grid>
                                <Grid item xs="8" container justifyContent="flex-start">
                                    <Typography>Orders Detail</Typography>
                                </Grid>
                            </Grid>
                        </Button>
                    </Grid>
                </Grid>

            </Box>
        </Paper>
    )
}

export default ProfileNav
