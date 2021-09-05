import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        [theme.breakpoints.down('xl')]: {
            padding: '64px 128px 0 128px'
        },
        [theme.breakpoints.down('md')]: {
            padding: '64px 32px 0 32px'
        },
        [theme.breakpoints.down('sm')]: {
            padding: '20px 20px 20px 20px'
        },
        [theme.breakpoints.down('xs')]: {
            padding: '20px 20px 20px 20px'
        }
    },
    button: {
        padding: '10px',
        color: "#fff",
        backgroundColor: "#f73471",
        '&:hover': {
            backgroundColor: "#f73471",
        }
    },
    title: {
        textTransform: 'uppercase',
        marginTop: '50px',
        fontWeight: '700',
        textAlign: 'center'
    },
    videos: {
        [theme.breakpoints.down('xl')]: {
            width: '560px'
        },
        [theme.breakpoints.down('md')]: {
            width: '560px'
        },
        [theme.breakpoints.down('sm')]: {
            width: '560px'
        }, [theme.breakpoints.down('xs')]: {
            width: '100%'
        }
    },
    justify: {
        display: 'flex',
        [theme.breakpoints.down('xl')]: {
            justifyContent: 'center'
        },
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center'
        },
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        }
    },
    image: {
        height: '600px',
        width: '65%',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    }

}));