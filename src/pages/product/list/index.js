import React, { Component } from 'react';
import api from '../../../services/api';
import ProductCard from './../../../components/ProductCard';

export default class ProductList extends Component {

    state = {
        products: [],
        productInfo:{}
    }

    //executado assim que o componente é exibido em tela
    componentDidMount(){
        this.loadProducts();
    }

    //arrow function nao sobreescreve o valor do this
    loadProducts = async () => {        
        const response = await api.get('/products');
        console.log(response.data);
        this.setState({products: response.data});
    }

    prevPage = () => {
        console.log("TODO prevPage");
    }
    nextPage = () => {
        console.log("TODO nextPage");
    }

    render(){
        return (
            <div>                
                <div className="product-list" style={styles.container}>
                    {this.state.products.map(product => (
                        <ProductCard product={product} key={product._id}/>
                    ))}

                    <div className="actions">
                        <button onClick={this.prevPage}>Back</button>
                        <button onClick={this.nextPage}>Next</button>
                    </div>
                </div>
            </div>
        );
    }
} 

const styles = {
    container:{
        justifyContent: 'center',
        display: 'grid',
    }
};