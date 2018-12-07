import React from 'react';
import { Switch, Route, withRouter  } from 'react-router-dom';
import Main from './pages/main';
import Product from './pages/product';
import NewProduct from './pages/ProductForm';

const Routes = () => (
    <Switch>
        <Route path="/" component={withRouter(Main)} exact></Route>
        <Route path="/product/new" component={withRouter(NewProduct)}></Route>
        <Route path="/product" component={withRouter(Product)}></Route>
    </Switch>
);

export default Routes;