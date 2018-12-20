import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const PopUp = ({ popup }) => (
    <Popover
        id="simple-popper"
        className={classes.popover}
        open={open}
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
        <Typography className={classes.typography}>{this.state.popUp.message}</Typography>
        <Typography className={classes.typography}>{this.state.popUp.message}</Typography>
        <Typography className={classes.typography}>{this.state.popUp.message}</Typography>
    </Popover>
);

PopUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PopUp);