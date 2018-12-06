import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from "react-router-dom";

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
                <h2>Products length: {this.state.products.length}</h2>
                <div className="product-list">
                    {this.state.products.map(product => (
                        
                        <article key={product._id}>                        
                            <strong>{product.title}</strong> - <span>R$ {product.price}</span>
                            <p>{product.slug}</p>
                            <Link to="/product">Open</Link>
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