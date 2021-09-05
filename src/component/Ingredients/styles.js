import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
    },
    gridContainer: {
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column-reverse',
        },
    },
    pink: {
        color: '#f73471'
    },
    fixed: {
        zIndex: '20',
        [theme.breakpoints.up('lg')]: {
            position: "fixed",
            width: '30%',
            right: '10px'
        },
        [theme.breakpoints.up('md')]: {
            position: 'fixed',
            width: '38%',
            right: '10px'
        },
        [theme.breakpoints.up('sm')]: {
            position: 'fixed',
            width: '50%',
            right: '10px'
        },
    },
    filter: {
        [theme.breakpoints.down('xl')]: {
            width: '23.8%',
            padding: '5px',
            marginBottom: '10px'
        },
        [theme.breakpoints.down('lg')]: {
            width: '23.8%',
            padding: '5px',
            marginBottom: '10px'
        },
        [theme.breakpoints.down('md')]: {
            width: '32%',
            padding: '5px',
            marginBottom: '10px'
        },
        [theme.breakpoints.down('sm')]: {
            width: '48.6%',
            padding: '5px',
            marginBottom: '10px'
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            padding: '5px',
            marginBottom: '10px'
        }
    },
    input: {
        '&[type=number]': {
            '-moz-appearance': 'textfield',
        },
        '&::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        },
        '&::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        },
    }


}));