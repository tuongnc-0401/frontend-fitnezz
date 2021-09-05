import { makeStyles } from "@material-ui/core";
export default makeStyles((theme) => ({
    container: {
        [theme.breakpoints.down('sm')]: {
            padding: '2em 2em 2em 2em'
        },
        [theme.breakpoints.up('lg')]: {
            padding: '4em 8em 0em 8em'
        },
        [theme.breakpoints.up('sm')]: {
            padding: '2em 4em 0em 4em'
        }

    },
    imageContain: {
        width: '100%',
    },
    image: {
        width: '100%',
        height: '100%'
    },
    productName: {
        fontFamily: 'sans-serif,serif',
        textTransform: 'uppercase'
    },
    description: {
        color: 'gray'
    },
    buttonContain: {

        display: "flex",
        alignItems: "center",
        marginBottom: '20px'
    },
    buttons: {
        border: '1px solid',
        borderRadius: '20px',
    },
    input: {
        width: '20px',
        fontSize: '17px',
        textAlign: 'center',
        borderColor: 'transparent'
    }, line: {
        height: '20px',
        width: '100%',
        borderBottom: '2px solid #e0e0e0',
    }
}))