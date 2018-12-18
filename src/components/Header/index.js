import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, MenuItem, Menu } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from "react-router-dom";

import styles from './styles';

import { validarToken, logout } from './../../services/auth-service';

class MenuAppBar extends React.Component {
    
    state = {
        auth: false,
        anchorEl: null,
    };
    
    componentDidMount() {
        this.validarLogin();
    }

    validarLogin = async () => {
        const data = await validarToken();
        if(!data){
            this.setState(() => ( { auth: false } ));
        }else{
            this.setState(() => ( { auth: true } ));
        }
    }

    signOut = async () => {
        this.setState({ anchorEl: null, auth: false });
        await logout();
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
                    
                        {auth && (<div>
                    <Menu id="render-props-menu" anchorEl={anchorEl2} open={openMainMenu} onClose={this.handleMainMenuClose}>
                            <MenuItem component={Link} to="/product/new" onClick={this.handleMainMenuClose}>Adicionar produto</MenuItem>
                            <MenuItem component={Link} to="/products" onClick={this.handleMainMenuClose}>Produtos</MenuItem>                    
                    </Menu>
                        </div>
                        )}

                    <Typography variant="h6" color="inherit" className={classes.grow} component={Link} to="/" style={{ textDecoration: 'none' }}>
                        Store
                    </Typography>

                        <IconButton
                            aria-owns={openUserMenu ? 'menu-appbar-login' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    
                    <div>                    
                        <Menu
                            id="menu-appbar-login"
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
                        {!auth && (
                            <div>
                                <MenuItem component={Link} to="/login" onClick={this.handleClose}>Sign in</MenuItem>
                            </div>
                        )}
                        {auth && (
                            <div>
                                <MenuItem onClick={this.handleClose}>TODO Profile</MenuItem>
                                <MenuItem onClick={this.handleClose}>TODO My account</MenuItem>
                                <MenuItem onClick={this.signOut}>Sign out</MenuItem>
                            </div>
                        )}
                        </Menu>
                    </div>
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