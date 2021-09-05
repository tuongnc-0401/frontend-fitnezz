import { AppBar, Avatar, Badge, Button, IconButton, Toolbar, Typography, withStyles } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ShoppingCart } from '@material-ui/icons';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { signout } from '../../actions/userActions';
import useStyles from './styles';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
}

const NavBar = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const [width] = useWindowSize();
    const cartItems = useSelector(state => state.cart.cartItems)
    const userSignIn = useSelector((state) => state.userSignIn)
    const { userInfo } = userSignIn
    const signoutHandler = () => {
        dispatch(signout())
        history.push('/')
        setAnchorEl(null)
    }
    const classes = useStyles();
    const StyledMenu = withStyles({
        paper: {
            border: '1px solid #d3d4d5',
        },
    })((props) => (
        <Menu
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            {...props}
        />
    ));
    const StyledMenuItem = withStyles((theme) => ({
        root: {
            '&:focus': {
                backgroundColor: theme.palette.primary.main,
                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                    color: theme.palette.common.white,
                },
            },
        },
    }))(MenuItem);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [activeNav, setActiveNav] = useState(false);

    const handleClickNav = () => {
        setActiveNav(!activeNav);
    }

    const [checkWidth, setCheckWidth] = useState(0)

    useEffect(() => {
        setCheckWidth(width);
    }, [width]);

    const handleScroll = () => {
        setActiveNav(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar style={{ padding: '0px' }}>
                    <div className={classes.burger} onClick={handleClickNav} onBlur={handleClickNav}>
                        {
                            activeNav ? <CloseIcon /> : <MenuIcon />
                        }

                    </div>

                    <Typography style={{ display: 'inline-block' }} component={Link} to="/" variant='h6' color="inherit" className={checkWidth < 1100 ? classes.logoTitleNoPadding : classes.logoTitle}>
                        FITNEZZ
                    </Typography>

                    {
                        checkWidth < 1100 && (<div style={{ width: '100%', height: '5px' }}></div>)
                    }

                    <div className={activeNav ? classes.itemsWrapperActive : classes.itemsWrapper} >
                        <div >
                            <Button component={Link} to="/" variant="text" color="inherit" >Home</Button>
                        </div>
                        <div>
                            <Button component={Link} to="/products" color="inherit" >Product</Button>
                        </div>
                        <div >
                            <Button color="inherit" component={Link} to="/calculator">Calculator</Button>
                        </div>
                        <div >
                            <Button color="inherit" component={Link} to="/ingredients">Ingredients</Button>
                        </div>
                        <div >
                            <Button color="inherit" component={Link} to="/meals">Meals</Button>
                        </div>
                        <div >
                            <Button color="inherit" component={Link} to="/videos">Programs</Button>
                        </div>
                        <div >
                            <Button component={Link} to="/aboutus" variant="text" color="inherit" >About Us</Button>
                        </div>
                    </div>

                    <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                        <Badge badgeContent={cartItems && cartItems.length} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>

                    {userInfo ? (
                        <div>
                            <Avatar onClick={handleClick} aria-controls="customized-menu" style={{ marginLeft: "15px", marginRight: "15px" }}
                                aria-haspopup="true" className={classes.pink} alt={userInfo.name}>{userInfo.name.charAt(0)}
                            </Avatar>
                            <StyledMenu
                                id="customized-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={open}
                                onClose={handleClose}
                            >
                                <StyledMenuItem component={Link} to="/userprofile" onClick={handleClose}>
                                    <ListItemIcon>
                                        <AccountCircleIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="My Profile" />
                                </StyledMenuItem>
                                <StyledMenuItem onClick={signoutHandler}>
                                    <ListItemIcon>
                                        <ExitToAppIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="Sign Out" />
                                </StyledMenuItem>

                            </StyledMenu>
                        </div>
                    )
                        :
                        <Button component={Link} to="/signin" variant="outlined" color="inherit" className={classes.login}>Login</Button>
                    }
                    {userInfo && userInfo.isAdmin && (
                        <Button component={Link} to="/admin" variant="outlined" color="inherit" className={classes.admin}>Admin</Button>
                    )
                    }

                </Toolbar>
            </AppBar>
        </div >
    );
}

export default NavBar
