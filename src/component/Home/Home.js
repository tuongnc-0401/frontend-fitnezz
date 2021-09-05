import { Button, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';
import { Link } from 'react-router-dom';

const Home = () => {
    const classes = useStyles();
    return (
        <Paper className={classes.mainContent} square>
            <div className={classes.overlay} />
            <Grid container className={classes.container} spacing={1}>
                <Grid className={classes.titleContent} container item direction="column" justifyContent="center"
                    alignItems="flex-start" spacing={2} xs={12}>
                    <Grid className={classes.textStyle} item>
                        <Typography variant="h5" align="left" style={{ color: "#000" }}>
                            Join us to keep healthy and fit.
                        </Typography>
                        <Typography variant="h5" align="left" style={{ color: "#000" }}>
                            Check out theses!!!
                        </Typography>
                    </Grid>
                    <Grid className={classes.buttons} container item direction="row">
                        <Button variant="contained" component={Link} to="/videos" className={classes.button} size="large">Programs</Button>
                        <Button variant="contained" component={Link} to="/meals" className={classes.button} size="large">Recipes</Button>
                        <Button variant="contained" component={Link} to="/products" className={classes.button} size="large">Store</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Paper >
    )
}

export default Home
