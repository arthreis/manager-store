import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import api from '../../services/api';

export default class Main extends Component {

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
        this.setState({products: response.data})
    }

    prevPage = () => {

    }
    nextPage = () => {

    }

    render(){
        return (
            <div>
                <Typography variant="display1">Products length: {this.state.products.length}</Typography>
                <div className="product-list">
                    {this.state.products.map(product => (
                        
                        <article key={product._id}>                        
                            <strong>{product.title}</strong>
                            <p>TODO Incluir descrição</p>
                            <a href="/product">Open</a>
                        </article>    

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