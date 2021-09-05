import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    bigPicture: {
        height: '600px',
        width: '100%',
        // backgroundColor: 'yellow',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        // filter: 'blur(8px)',
    },

    information: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            // backgroundColor: 'white',
            // borderBottom: 'solid 1px black',
            justifyContent: 'center',
        },
    },

    forTheme: {
        backgroundColor: 'white',
        boxShadow: '1px 1px 10px 1px #888888',
        width: '500px',
        height: '80%',
        marginRight: '300px',
        padding: '0px 90px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '0px',
        },
        [theme.breakpoints.down('xs')]: {
            marginRight: '0px',
            height: '100%',
        },
    },

    info: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '15px 0px',
    },

    icon: {
        fontSize: '28px',
    },

    duration: {
        color: 'rgb(247, 52, 113)',
        fontWeight: '700',
        fontSize: '18px',
        marginBottom: '5px',
    },

    bottom: {
        fontSize: '18px',
    },


    container: {
        width: '100%',
        // backgroundColor: 'aqua',
    },

    line: {
        width: '10%',
        height: '60px',
        borderBottom: 'solid 1px black',
    },

    toWrap: {
        width: '100%',
        display: 'flex',
    },

    timeLine: {
        width: '10%',
        height: '447px',
        // backgroundColor: 'red'
    },

    contentRight: {
        width: '90%',
        height: '90%',
        // backgroundColor: 'blue',
        display: 'flex',
        flexDirection: 'column',
        // marginTop: '30px',
        // marginBottom: '50px',
    },
}));