import { makeStyles } from "@material-ui/core";
import cartImg from '../cartImg.jpg';


export default makeStyles(() => ({
    video: {
        // backgroundColor: 'yellow',
        backgroundColor: 'white',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: '50px',
        paddingBottom: '0px!important',
        zIndex: '5',
        // border: 'solid 1px red'
    },

    cart: {
        height: '100%',
        width: '360px',
        backgroundImage: `url(${cartImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: 'pointer',
        textDecoration: 'none',
    },

    overlay: {
        width: '100%',
        height: '100%',
        background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7679446778711485) 25%, rgba(0,0,0,0.4542191876750701) 45%, rgba(255,255,255,0) 61%)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        transform: 'translateY(90px)',
        transition: '0.2s ease-in-out',
        zIndex: '0'
    },

    overlayHover: {
        width: '100%',
        height: '100%',
        background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7679446778711485) 25%, rgba(0,0,0,0.4542191876750701) 45%, rgba(255,255,255,0) 61%)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        transform: 'translateY(0px)',
        transition: '0.2s ease-in-out',
    },
}));