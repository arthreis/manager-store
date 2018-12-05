import React, { Fragment } from 'react';
import {CssBaseline, withStyles} from '@material-ui/core';

import "./App.css"

import AppHeader from './components/Header';
import AppFooter from './components/Footer';

import Routes from './routes';

const styles = theme => ({
  main: {
    padding: 3 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      padding: 2 * theme.spacing.unit,
    },
  },
});

const App = ({ classes }) => (
  <Fragment>
    <CssBaseline />
    <AppHeader />
    <main className={classes.main}>
      <Routes/>
    </main>
    <AppFooter />
  </Fragment>
);

export default withStyles(styles)(App);
