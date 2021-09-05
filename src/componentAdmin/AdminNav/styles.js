import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    container: {
        width: '100%',
        display: 'flex',
    },

    plankSpace: {
        height: '400px',
        minWidth: '240px',
        backgroundColor: 'aqua'
    },

    sideBar: {
        position: 'fixed',
        minHeight: '100%',
        backgroundColor: '#052963',
        width: '240px',
        left: '0px',
        boxShadow: '2px 0px 5px black',
        zIndex: '100'
    },

    adminInfo: {
        backgroundColor: 'white',
        width: '100%',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    item: {
        display: 'flex',
        padding: '10px 16px',
        alignItems: 'center',
        borderBottom: 'solid 0.2px black',
        color: 'white',
        backgroundColor: '#052963',
    },

    itemHover: {
        display: 'flex',
        padding: '10px 16px',
        alignItems: 'center',
        borderBottom: 'solid 0.2px black',
        color: 'white',
        backgroundColor: '#4287f5',
        cursor: 'pointer',
        transition: '0.2s ease-in-out'
    }
}));