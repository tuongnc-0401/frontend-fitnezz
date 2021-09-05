import { Box, Container, Grid, Link, ListItem, ListItemIcon, Typography } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import React from 'react';
import useStyles from './styles';

const Footer = () => {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <Box>
                <Container maxWidth="xl">
                    <Grid container direction="row" justifyContent="space-evenly" >
                        <Grid style={{ color: "white" }} container justifyContent="center" item xs={12} sm={4}>
                            <Box style={{ width: "70%" }}>
                                <Box mb={1} style={{ fontWeight: "bold", fontSize: "medium" }} >About Us</Box>
                                <Typography variant="body1" style={{ color: "grey" }}>FITNEZZ is a online platform which provides people healthy food, ingredients and exercises for keeping their health fit.</Typography>
                                <Box component="span">
                                    <ListItem>
                                        <ListItemIcon><FacebookIcon /></ListItemIcon>
                                        <ListItemIcon><YouTubeIcon /></ListItemIcon>
                                        <ListItemIcon><InstagramIcon /></ListItemIcon>
                                    </ListItem>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid style={{ color: "white" }} container justifyContent="center" item xs={12} sm={4}>
                            <Box>
                                <Box mb={1} style={{ fontWeight: "bold", fontSize: "medium" }}>Contact Info</Box>
                                <Box >
                                    <Box>
                                        <Typography variant="body1" style={{ color: "grey" }}>
                                            Address:
                                        </Typography>
                                        <Typography variant="body1">
                                            702 Nguyen Van Linh, Tan Hung Ward, District 7, Ho Chi Minh City
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="body1" style={{ color: "grey" }}>
                                            Telephone:
                                        </Typography>
                                        <Typography variant="body1">
                                            028 3776 1300
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="body1" style={{ color: "grey" }}>
                                            Email:
                                        </Typography>
                                        <Typography variant="body1">
                                            fitnezz@gmail.com
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid style={{ color: "white" }} container justifyContent="flex-start" item xs={12} sm={4}>
                            <Box style={{ paddingLeft: "100px" }}>
                                <Box mb={1} style={{ fontWeight: "bold", fontSize: "medium" }}>Quick Links</Box>
                                <Box >
                                    <Box>
                                        <Link className={classes.pink} href="#">About</Link>
                                    </Box>
                                    <Box>
                                        <Link className={classes.pink} href="#">Terms of Use</Link>
                                    </Box>
                                    <Box>
                                        <Link className={classes.pink} href="#">Disclaimers</Link>
                                    </Box>
                                    <Box>
                                        <Link className={classes.pink} href="#">Contact</Link>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Box mt={5}>
                <Typography variant="body1" className={classes.pink} align="center">
                    {'Copyright © '}
                    <Link color="inherit" href="https://www.youtube.com/channel/UCJlGqX5vRrletRQphYSNztQ">
                        FITNEZZ
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Box>
        </footer >
    )
}

export default Footer
