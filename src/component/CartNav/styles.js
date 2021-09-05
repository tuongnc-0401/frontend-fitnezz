import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
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
}))