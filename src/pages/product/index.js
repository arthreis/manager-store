import React from 'react';
import { Typography } from '@material-ui/core';
import api from '../../services/api';

class Product extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            product: {}
        };
    }
    
    componentDidMount(){
        this.getProductById(this.props.match.params.id);
        const { product } = this.props.location.state;
        this.setState({product: product});
    }

    getProductById = async (productId) => {
        const response = await api.get('/products/admin/' + productId);
        this.setState({ product: response.data });
    }

    render() {
        return (
            <div>
                <Typography variant="display1">{this.state.product.title}</Typography>
                <Typography variant="display1">{this.state.product.slug}</Typography>
                <Typography variant="display1">{this.state.product.price}</Typography>
                <Typography variant="display1">{this.state.product.description}</Typography>
            </div>
        );
    }
}
export default (Product);