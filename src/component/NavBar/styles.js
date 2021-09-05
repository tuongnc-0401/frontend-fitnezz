import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
    appBar: {
        backgroundColor: "black",
    },
    itemsWrapper: {
        flexGrow: 1,
        zIndex: '100',
        padding: '0px 10%',
        display: 'flex',
        justifyContent: 'space-evenly',
        [theme.breakpoints.down('1100')]: {
            backgroundColor: "black",
            width: '60%',
            position: 'absolute',
            left: '0px',
            height: '95vh',
            top: '6vh',
            zIndex: '100',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: 'translateX(-100%)',
            transition: '0.5s ease-in-out',
        },
    },

    itemsWrapperActive: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'space-evenly',
        [theme.breakpoints.down('1100')]: {
            backgroundColor: "black",
            width: '60%',
            position: 'absolute',
            left: '0px',
            height: '95vh',
            top: '6vh',
            zIndex: '100',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: 'translateX(0%)',
            transition: '0.5s ease-in-out',
        },

        [theme.breakpoints.down('510')]: {
            backgroundColor: "black",
            width: '100%',
            position: 'absolute',
            left: '0px',
            height: '95vh',
            top: '6vh',
            zIndex: '100',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: 'translateX(0%)',
            transition: '0.5s ease-in-out',
        },


    },

    burger: {
        display: 'none',
        padding: '10px 15px',
        cursor: 'pointer',
        [theme.breakpoints.down('1100')]: {
            display: 'block'
        },
    },

    root: {
        flexGrow: 1
    },
    title: {
        marginRight: '10px',
    },
    logoTitle: {
        alignItems: 'center',
        display: 'flex',
        textDecoration: 'none',
        marginLeft: '20px'
    },

    logoTitleNoPadding: {
        alignItems: 'center',
        display: 'flex',
        textDecoration: 'none',
    },

    image: {
        marginRight: '10px',
    },
    login: {
        marginRight: '10px'
    },
    admin: {
        marginLeft: '10px',
        marginRight: '20px'
    },
    pink: {
        color: "white",
        backgroundColor: "#f73471",
    },
}));