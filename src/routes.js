import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/main';
import Product from './pages/product';
import NewProduct from './pages/ProductForm';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main}></Route>
            <Route path="/product/new" component={NewProduct}></Route>
            <Route path="/product" component={Product}></Route>
        </Switch>
    </BrowserRouter>
);

export default Routes;