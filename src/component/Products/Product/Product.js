import React from 'react'
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles.js'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
    const classes = useStyles()
    return (
        <Card className={classes.root} elevation={6}>
            <CardHeader
                title={product.name}
                style={{ textAlign: 'center' }}
            />
            <CardMedia
                className={classes.media}
                image={product.image}
                title="Paella dish"
            />
            <CardContent className={classes.cardContent}>
                <Box display="flex" alignItems="center" mt={1} >
                    <Box borderColor="transparent">
                        <Rating name="read-only" value={product.rating} precision={0.5} readOnly />
                    </Box>
                    <Box ml={2} borderColor="transparent">
                        | {product.numReviews} sold
                    </Box>
                </Box>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <Typography variant="h6" style={{ color: '#f73471' }}>${product.price}</Typography>
                <Button component={Link} to={`/product/${product._id}`} variant="contained" style={{ borderRadius: '20px', backgroundColor: '#f73471', color: '#fff' }}>View Detail</Button>
            </CardActions>
        </Card>
    )
}

export default Product
