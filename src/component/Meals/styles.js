import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    title: {
        [theme.breakpoints.down('sm')]: {
            justifyContent: "center",
            marginTop: "5px",
        }
    },
    titleHeading: {
        [theme.breakpoints.down('sm')]: {
            fontSize: "2.15em"
        }
    },
    colorPink: {
        color: "#f73471",
    }

}))