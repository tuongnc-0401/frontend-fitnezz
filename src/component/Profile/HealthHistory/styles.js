import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    rightSide: {

        [theme.breakpoints.up('md')]: {
            borderLeft: "1px #f73471 solid",
            paddingLeft: "10px",

        }
    },


}))