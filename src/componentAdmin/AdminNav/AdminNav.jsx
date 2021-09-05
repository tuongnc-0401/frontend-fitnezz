import {
    Avatar, Button, Grid
} from "@material-ui/core";
import CommentIcon from '@material-ui/icons/Comment';
import CreateIcon from '@material-ui/icons/Create';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { Link as changeURL } from 'react-router-dom'
import { signout } from "../../actions/userActions";

const AdminNav = () => {
    const classes = useStyles();
    const userSignIn = useSelector(state => state.userSignIn);
    const dispatch = useDispatch()


    //for hover
    const [hoverDashboard, setHoverDashboard] = useState(false);
    const [hoverIngredient, setHoverIngredient] = useState(false);
    const [hoverUser, setHoverUser] = useState(false);
    const [hoverOrder, setHoverOrder] = useState(false);
    const [hoverMeal, setHoverMeal] = useState(false);
    const [hoverVideo, setHoverVideo] = useState(false);
    const [hoverRecommendation, setHoverRecommendation] = useState(false);
    const [hoverLogin, setHoverLogin] = useState(false);


    const { userInfo } = userSignIn;

    return (
        <Grid className={classes.sideBar}>
            <Grid style={{ display: 'flex', alignItems: 'center', backgroundColor: '#052963', color: 'white', height: '50px' }}>
                <Button component={changeURL} to="/" style={{ flexGrow: '1', fontWeight: '550', fontSize: '32px', textAlign: 'center', color: "white" }}>
                    Fitnezz
                </Button>
            </Grid>

            <Grid className={classes.adminInfo} >
                <Avatar aria-controls="customized-menu" aria-haspopup="true" alt={userInfo.name} style={{ marginTop: '15px', border: 'solid 1px #052963', width: '60px', height: '60px', color: '#052963' }}>{userInfo.name.charAt(0)}</Avatar>

                <Grid style={{ marginTop: '10px' }}>
                    {userInfo.name}
                </Grid>

                <Grid style={{ marginTop: '15px' }}>
                    {userInfo.email}
                </Grid>

                <Grid style={{ marginTop: '15px' }}>
                    {userInfo.isAdmin && "Admin"}
                </Grid>
            </Grid>
            <Grid component={changeURL} to="/admin" className={hoverDashboard ? classes.itemHover : classes.item} onMouseEnter={() => setHoverDashboard(true)} onMouseLeave={() => setHoverDashboard(false)} >
                <DashboardIcon />
                <Grid style={{ marginLeft: '5px' }}>
                    Dashboard
                </Grid>
            </Grid>

            <Grid component={changeURL} to="/admin/ingredient" className={hoverIngredient ? classes.itemHover : classes.item} onMouseEnter={() => setHoverIngredient(true)} onMouseLeave={() => setHoverIngredient(false)}>
                <CreateIcon />
                <Grid style={{ marginLeft: '5px' }}>
                    Ingredients
                </Grid>
            </Grid>

            <Grid component={changeURL} to="/admin/user" className={hoverUser ? classes.itemHover : classes.item} onMouseEnter={() => setHoverUser(true)} onMouseLeave={() => setHoverUser(false)}>
                <PeopleIcon />
                <Grid style={{ marginLeft: '5px' }}>
                    Users
                </Grid>
            </Grid>

            <Grid component={changeURL} to="/admin/order" className={hoverOrder ? classes.itemHover : classes.item} onMouseEnter={() => setHoverOrder(true)} onMouseLeave={() => setHoverOrder(false)}>
                <ShoppingBasketIcon />
                <Grid style={{ marginLeft: '5px' }}>
                    Orders
                </Grid>
            </Grid>

            <Grid component={changeURL} to="/admin/product" className={hoverMeal ? classes.itemHover : classes.item} onMouseEnter={() => setHoverMeal(true)} onMouseLeave={() => setHoverMeal(false)}>
                <FastfoodIcon />
                <Grid style={{ marginLeft: '5px' }}>
                    Products
                </Grid>
            </Grid>

            <Grid component={changeURL} to="/admin/videos" className={hoverVideo ? classes.itemHover : classes.item} onMouseEnter={() => setHoverVideo(true)} onMouseLeave={() => setHoverVideo(false)}>
                <VideoLibraryIcon />
                <Grid style={{ marginLeft: '5px' }}>
                    Videos
                </Grid>
            </Grid>

            <Grid component={changeURL} to="/admin/meal" className={hoverRecommendation ? classes.itemHover : classes.item} onMouseEnter={() => setHoverRecommendation(true)} onMouseLeave={() => setHoverRecommendation(false)}>
                <CommentIcon />
                <Grid style={{ marginLeft: '5px' }}>
                    Recommendations
                </Grid>
            </Grid>

            <Grid onClick={() => dispatch(signout())} component={changeURL} className={hoverLogin ? classes.itemHover : classes.item} onMouseEnter={() => setHoverLogin(true)} onMouseLeave={() => setHoverLogin(false)}>
                <ExitToAppIcon />
                <Grid style={{ marginLeft: '5px' }}>
                    Logout
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AdminNav
