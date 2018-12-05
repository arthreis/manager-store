import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, IconButton, FormGroup, FormControlLabel, MenuItem, Menu, Switch} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { BrowserRouter as Router, Route, Link, Switch as SwitchDOM } from "react-router-dom";

import Main from '../../pages/main';
import Product from '../../pages/product';

import styles from './styles';

class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleMainMenu = event => {
    this.setState({ anchorEl2: event.currentTarget });
  };
  handleMainMenuClose = () => {
    this.setState({ anchorEl2: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl, anchorEl2 } = this.state;
    const openUserMenu = Boolean(anchorEl);
    const openMainMenu = Boolean(anchorEl2);

    return (
      <div className={classes.root}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />
            }
            label={auth ? 'Logout' : 'Login'}
          />
        </FormGroup>
        <AppBar position="static">
          <Toolbar>

            <IconButton 
              className={classes.menuButton} 
              color="inherit" 
              aria-label="Menu" 
              aria-owns={openUserMenu ? 'render-props-menu' : undefined} 
              onClick={this.handleMainMenu}>
              <MenuIcon />
            </IconButton>
              
            <Menu id="render-props-menu" anchorEl={anchorEl2} open={openMainMenu} onClose={this.handleMainMenuClose}>
              <Router>
                <SwitchDOM>

                  <Link to="/product">
                    <MenuItem onClick={this.handleMainMenuClose}>Product</MenuItem>
                  </Link>
                  <Link to="/">
                    <MenuItem onClick={this.handleMainMenuClose}>Home</MenuItem>
                  </Link>
                  
                
                </SwitchDOM>
              </Router>

              
              
            </Menu>

            <Typography variant="h6" color="inherit" className={classes.grow}>
              Store
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={openUserMenu ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={openUserMenu}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);