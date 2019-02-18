import React from 'react';
import { Typography } from '@material-ui/core';

class Product extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            product: {}
        };
    }
    
    componentDidMount(){
        const { product } = this.props.location.state;
        this.setState({product: product});
    }

    loadProduct = async () => {
        /*const response = await api.get('/products/admin/');
        console.log(response.data);
        this.setState({product: response.data});*/
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
/*export default ({product}) => (

    <div>
        <Typography variant="display1">{product.title}</Typography>
        <Typography variant="display1">{product.slug}</Typography>
        <Typography variant="display1">{product.price}</Typography>
        <Typography variant="display1">{product.description}</Typography>
    </div>
);*/