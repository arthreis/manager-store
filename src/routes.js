import React from 'react';
import { Switch, Route, withRouter  } from 'react-router-dom';
import Main from './pages/main';
import Product from './pages/product/details';
import NewProduct from './pages/product/form';
import AllProducts from './pages/product/list';
import Login from './pages/login';

const Routes = () => (
    <Switch>
        <Route path="/" component={withRouter(Main)} exact></Route>
        <Route path="/product/new" component={withRouter(NewProduct)}></Route>
        <Route path="/product/edit/:id" component={withRouter(NewProduct)}></Route>
        <Route path="/product/:id" component={withRouter(Product)}></Route>
        <Route path="/products" component={withRouter(AllProducts)}></Route>
        <Route path="/login" component={withRouter(Login)}></Route>
    </Switch>
);

export default Routes;