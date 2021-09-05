import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({

    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        backgroundPosition: "center",
        backgroundSize: "contain",
    },
    cardActions: {
        justifyContent: 'space-around'
    },
    cardContent: {
        paddingBottom: '0'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },

}
))