import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, Popover, withStyles } from '@material-ui/core';

import styles from './styles';

class PopUp extends Component {
    
    constructor(props){
        super(props);

        this.handleClosePopover = this.handleClosePopover.bind(this);

        this.state = {
            popup: {opened: props.popup.opened, message: props.popup.message},
        }

    }
    
    static getDerivedStateFromProps(nextProps, state) {
        if(nextProps.popup.opened !== state.popup.opened){
            return {popup: {opened: nextProps.popup.opened, message: nextProps.popup.message}};
        }
        return null;
    }
    
    handleClosePopover = () => {
        this.setState({popup: {opened: false, message: null}});
    }

    styles = theme => ({
        typography: {
            margin: theme.spacing.unit * 2,
        }
    })

    /*if(!Array.isArray(popup.message)){
        //<Typography className={styles.typography}>{popup.message}</Typography>
        messages.push(Array.isArray(<Typography className={styles.typography}>{popup.message}</Typography>));
    }*/

    render() {
        return (
            <Popover
                id="simple-popper"
                className={styles.popover}
                open={this.state.popup.opened}
                onClose={this.handleClosePopover}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                
                <Typography className={styles.typography}>{this.state.popup.message}</Typography>

            </Popover>
        );
    }
};

PopUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PopUp);