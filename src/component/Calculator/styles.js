import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    title: {
        [theme.breakpoints.down('sm')]: {
            justifyContent: "flex-start"
        }
    },
    btnGroup: {
        [theme.breakpoints.down('sm')]: {
            justifyContent: "center"
        }
    },


}))