import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    picture: {
        [theme.breakpoints.down('sm')]: {
            height: "auto"
        },
        [theme.breakpoints.up('md')]: {
            height: "300px"
        }
    },
    cartNav: {
        [theme.breakpoints.up('sm')]: {
            display: "flex",
            justifyContent: "center"
        }
    },
}));