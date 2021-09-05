import React from 'react'
import { Grid, Container, CssBaseline, Typography, Box, Card, CardMedia, CardContent } from '@material-ui/core'
import useStyles from './styles';

const AboutUs = () => {
    const classes = useStyles();
    return (
        <div className={classes.main}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box mt={3} />
                <Grid container direction="row" spacing={5} >
                    <Grid container item justifyContent="center" alighItems="center" >
                        <Box borderBottom={1} mt={1}>
                            <Typography variant="h2">About <b className={classes.pink}>FITNEZZ</b></Typography>
                        </Box>

                    </Grid>

                    <Grid container item justifyContent="center" alighItems="center" >
                        <Box mt={1} style={{ width: "28%" }}>
                            <Typography className={classes.subIntro} variant="body" align="justify" display="block">FITNEZZ is a online platform which provides people healthy food, ingredients and exercises for keeping their health fit.</Typography>
                        </Box>
                    </Grid>

                    <Grid container item justifyContent="space-around" xs={12} style={{ width: "100%" }}>
                        <Box borderBottom={0}><img className={classes.image} src="/AboutFitnezz.jpg" alt="aboutus" /></Box>
                        <Box borderBottom={0}><img className={classes.image} src="/healthy-food.jpg" alt="aboutus" /></Box>
                    </Grid>

                    <Grid container item justifyContent="center" alighItems="center" >
                        <Box borderBottom={1} mt={1}>
                            <Typography variant="h2">We Are <b className={classes.pink}>AMIGOS</b></Typography>
                        </Box>
                    </Grid>

                    <Grid container item justifyContent="center" alighItems="center" >
                        <Box mt={1} style={{ width: "28%" }}>
                            <Typography className={classes.subIntro} variant="body" align="justify" display="block">We are a group of friends who are second-year university. We have developed FITNESS in order to serve people to improve their health during the Covid period and into the future.</Typography>
                        </Box>
                    </Grid>

                    <Grid container item justifyContent="center" alighItems="center">
                        <Box borderBottom={1} mt={1}>
                            <Typography className={classes.pink} variant="h2">MEMBER</Typography>
                        </Box>
                    </Grid>

                    <Grid container item justifyContent="center" alighItems="center">
                        <Card>
                            <CardMedia className={classes.media} image="/tuong.jpg" />
                            <CardContent>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    Nguyen Cat Tuong
                                </Typography>
                                <Typography variant="body2" color="textPrimary" component="p">
                                    Role: Leader, Project Manager
                                </Typography>
                                <Typography variant="body2" color="textPrimary" component="p">
                                    Major: Information Technology
                                </Typography>
                                <Typography variant="body2" color="textPrimary" component="p">
                                    Year: 2
                                </Typography>
                                <Typography variant="body2" color="textPrimary" component="p">
                                    School: RMIT University
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>


                    <Grid container item justifyContent="center" alighItems="center" xs={12} sm={6} md={4} lg={3}>
                        <Card>
                            <CardMedia className={classes.media} image="/huuhuy.jpg" />
                            <CardContent>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    Pham Huu Huy
                                </Typography>
                                <Typography variant="body2" color="textPrimary" component="p">
                                    Role: Backend, Function Handler
                                </Typography>
                                <Typography variant="body2" color="textPrimary" component="p">
                                    Major: Information Technology
                                </Typography>
                                <Typography variant="body2" color="textPrimary" component="p">
                                    Year: 2
                                </Typography>
                                <Typography variant="body2" color="textPrimary" component="p">
                                    School: RMIT University
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid container item justifyContent="center" alighItems="center" xs={12} sm={6} md={4} lg={3}>
                        <Card>
                            <CardMedia className={classes.media} image="/quochuy.jpg" />
                            <CardContent>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    Nguyen Quoc Huy
                                </Typography>
                                <Typography variant="body2" color="textPrimary" component="p">
                                    Role: Backend, Function Handler
                                </Typography>
                                <Typography variant="body2" color="textPrimary" component="p">
                                    Major: Information Technology
                                </Typography>
                                <Typography variant="body2" color="textPrimary" component="p">
                                    Year: 2
                                </Typography>
                                <Typography variant="body2" color="textPrimary" component="p">
                                    School: RMIT University
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid container item justifyContent="center" alighItems="center" xs={12} sm={6} md={4} lg={3}>
                        <Card>
                            <CardMedia className={classes.media} image="/nhochuy.jpg" />
                            <CardContent>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    Nguyen Dinh Nhat Huy
                                </Typography>
                                <Typography variant="body2" color="textPrimary" component="p">
                                    Role: Frontend, Data Analysis
                                </Typography>
                                <Typography variant="body2" color="textPrimary" component="p">
                                    Major: Information Technology
                                </Typography>
                                <Typography variant="body2" color="textPrimary" component="p">
                                    Year: 2
                                </Typography>
                                <Typography variant="body2" color="textPrimary" component="p">
                                    School: RMIT University
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid container item justifyContent="center" alighItems="center" xs={12} sm={6} md={4} lg={3}>
                        <Card>
                            <CardMedia className={classes.media} image="/tuan1.jpg" />
                            <CardContent>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    Hoang Ngoc Tuan
                                </Typography>
                                <Typography variant="body2" color="textPrimary" component="p">
                                    Role: Frontend, Data Analysis
                                </Typography>
                                <Typography variant="body2" color="textPrimary" component="p">
                                    Major: Information Technology
                                </Typography>
                                <Typography variant="body2" color="textPrimary" component="p">
                                    Year: 2
                                </Typography>
                                <Typography variant="body2" color="textPrimary" component="p">
                                    School: RMIT University
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </Container>
            <Box mb={4} />
        </div >
    )
}

export default AboutUs
