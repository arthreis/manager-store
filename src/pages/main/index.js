import React, { Component } from 'react';

import styles from './styles';

export default class Main extends Component {

    //executado assim que o componente é exibido em tela
    componentDidMount(){
        console.log("Main page");
    }

    render(){
        return (
            <div style={ styles }>
            </div>
        );
    }
} 