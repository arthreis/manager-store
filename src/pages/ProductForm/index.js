import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {TextField, withStyles, Switch} from '@material-ui/core';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class ProductForm extends React.Component {
  state = {
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
            required  
            id="outlined-required"
            label="Name"
            defaultValue="Product name"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            fullWidth
            />
        <TextField
            required
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows="4"
            defaultValue="Default Value"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            fullWidth
        />
        <TextField
            id="outlined-dense"
            label="Slug"
            className={classNames(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            />
        <TextField
            id="outlined-number"
            label="Price"
            value={this.state.age}
            onChange={this.handleChange('age')}
            type="number"
            className={classNames(classes.textField, classes.dense)}
            InputLabelProps={{
            shrink: true,
            }}
            margin="normal"
            variant="outlined"
        />
        <TextField
            id="outlined-search"
            label="Tags"
            type="search"
            className={classes.textField}
            margin="normal"
            variant="outlined"
        />
        <Switch></Switch>
      </form>
    );
  }
}

ProductForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductForm);