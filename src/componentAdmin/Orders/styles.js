import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
    },
    pink: {
        backgroundColor: "#052963",
        color: "white",
        '&:hover': {
            backgroundColor: "#4287f5",
        }
    }
}));