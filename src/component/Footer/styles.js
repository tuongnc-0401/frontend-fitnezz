import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    footer: {
        position: 'relative',
        bottom: "0px",
        width: "100%",
        padding: theme.spacing(3, 0),
        backgroundColor: "#2A2B2E",
        marginTop: '50px'
    },

    pink: {
        color: '#f73471'
    },
    grey: {
        color: '#494F52'
    }
}));