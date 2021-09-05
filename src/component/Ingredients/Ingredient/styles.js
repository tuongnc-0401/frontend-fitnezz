import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    cardActions: {
        justifyContent: 'space-between',
        paddingLeft: '15px',
        paddingRight: '15px'
    },
    cardContent: {
        paddingBottom: '0',
        height: '40px',
        overflowY: "scroll"
    },
    button: {
        borderRadius: '20px', backgroundColor: '#f73471', color: '#fff',
        '&:hover': {
            backgroundColor: "#f73471",
        }
    }
}
))