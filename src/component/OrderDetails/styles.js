import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    cartNav: {
        [theme.breakpoints.up('sm')]: {
            display: "flex",
            justifyContent: "center"
        }
    },
}));