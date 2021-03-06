import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

const styles = {
  card: {
    maxWidth: 345,
    marginBottom: 20
  },
  media: {
      height: 140,
  },
  marginLeft: {
      marginLeft: 'auto',
  },
  marginRight: {
      marginRight: 'auto',
  },
};

const ProductCard = ({ product }) => (
    <Card style={styles.card}>
        <CardActionArea component={Link} to={{ pathname: `/product/${product._id}`, state: { produto: product} }} params={product._id}>        
            <CardMedia
                style={styles.media}
                image={"assets/images/store-main.jpg"}
                title={product.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h5">
                    { product.title }
                </Typography>
                <Typography component="p">
                    { product.slug } { product.price }
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="primary" variant="contained" style={styles.marginRight} component={Link} to={ {pathname: `/product/edit/${product._id}`, state: {produto: product}}} params={product._id} >
                Edit
            </Button>
            <Button size="small" color="secondary" variant="contained" style={styles.marginLeft}>
                Delete
            </Button>
        </CardActions>
    </Card>
  );

ProductCard.propTypes = {
  product: PropTypes.shape({
      title: PropTypes.string,
      price: PropTypes.number,
      slug:  PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(ProductCard);