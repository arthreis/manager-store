import React from 'react';
import { Switch, Route, withRouter  } from 'react-router-dom';
import Main from './pages/main';
import Product from './pages/product';
import NewProduct from './pages/productForm';
import AllProducts from './pages/productList';
import Login from './pages/login';

const Routes = () => (
    <Switch>
        <Route path="/" component={withRouter(Main)} exact></Route>
        <Route path="/product/new" component={withRouter(NewProduct)}></Route>
        <Route path="/product/:id" component={withRouter(Product)}></Route>
        <Route path="/products" component={withRouter(AllProducts)}></Route>
        <Route path="/login" component={withRouter(Login)}></Route>
    </Switch>
);

export default Routes;