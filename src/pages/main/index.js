import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link } from "react-router-dom";

import styles from './styles';

class Main extends Component {

    //executado assim que o componente é exibido em tela
    componentDidMount(){
        console.log("Main page");
    }

    render(){
        return (
            <div style={ styles.background }>
                <Fab size="large" color="secondary" aria-label="Add" style={ styles.addButton } component={Link} to="/product/new">
                    <AddIcon />
                </Fab>
            </div>
        );
    }
} 

export default Main;