import React, { Fragment } from 'react';
import {CssBaseline, withStyles} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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

const theme = createMuiTheme({
  palette: {
    primary: { main: "#eee" },
    secondary: { main: '#fff' },
  },
});

const App = ({ classes }) => (
  <MuiThemeProvider theme={theme}>
    <Fragment>
      <CssBaseline />
      <AppHeader />
      <main className={classes.main}>
        <Routes/>
      </main>
      <AppFooter />
    </Fragment>
  </MuiThemeProvider>
);

export default withStyles(styles)(App);
