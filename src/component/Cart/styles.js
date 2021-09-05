import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    cartNav: {
        [theme.breakpoints.up('sm')]: {
            display: "flex",
            justifyContent: "center"
        }
    },
    displayNone: {
        [theme.breakpoints.down('lg')]: {
            display: "none"
        },
        [theme.breakpoints.up('lg')]: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
        },
    },
    displayText: {
        [theme.breakpoints.down('lg')]: {
            display: "block"
        },
        [theme.breakpoints.up('lg')]: {
            display: "none"
        },
    },
    container: {
        padding: "3rem 8rem 0rem 8rem"
    },
    line: {
        width: '50px',
        height: '4px',
        backgroundColor: "#f73471",
        opacity: '0.2',
    },
    lineActive: {
        width: '50px',
        height: '4px',
        backgroundColor: "#f73471",
    },
    buttonNav: {
        backgroundColor: "#f73471",
        borderRadius: "20px",
        textTransform: 'none',
        width: '100px',
        color: '#fff',
        opacity: '0.3',
        '&:hover': {
            opacity: '1',
            backgroundColor: "#f73471",
        }
    },
    buttonNavActive: {
        backgroundColor: "#f73471",
        borderRadius: "20px",
        textTransform: 'none',
        width: '100px',
        color: '#fff',
        '&:hover': {
            backgroundColor: "#f73471",
        }
    },
    disabledButton: {
        backgroundColor: "#f73471",
        borderRadius: "20px",
        textTransform: 'none',
        width: '100px',
        color: '#fff',
        cursor: 'not-allowed',
        opacity: '0.3',
        '&:hover': {
            backgroundColor: "#f73471",
        }
    },
    paper: {
        display: 'flex'
    },
    content: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: "space-between",
        padding: '20px',
        flexGrow: '1'
    },
    cartName: {
        fontWeight: '700',
        fontSize: '20px'
    },
    input: {
        width: "40px",
        border: "1px solid pink",
        fontSize: "20px",
        textAlign: "center",
        '&[type=number]': {
            '-moz-appearance': 'textfield',
        },
        '&::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        },
        '&::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        },
    },

}))