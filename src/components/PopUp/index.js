import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, Popover, withStyles } from '@material-ui/core';

import styles from './styles';

class PopUp extends Component {
    
    constructor(props){
        super(props);
        debugger;
        console.log(props);

        this.state = {
            popup: {opened: false, message: null},
        }

    }

    handleClosePopover = () => {
        console.log("handleClosePopover");        
        //popup = {opened: false, message: null};
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
                

            </Popover>
        );
    }
};

PopUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PopUp);