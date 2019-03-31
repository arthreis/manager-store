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
    }

    getProductById = async (productId) => {
        const response = await api.get('/products/admin/' + productId);
        this.setState({ product: response.data });
    }

    render() {
        return (
            <div>
                <Typography variant="h6">{this.state.product.title}</Typography>
                <Typography variant="h6">{this.state.product.slug}</Typography>
                <Typography variant="h6">{this.state.product.price}</Typography>
                <Typography variant="h6">{this.state.product.description}</Typography>
            </div>
        );
    }
}
export default (Product);
