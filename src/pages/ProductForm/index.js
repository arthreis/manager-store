import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {TextField, withStyles, Switch, FormControlLabel, Grid, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Add';

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

    constructor(props) {
        super(props);        
    
        
        this.state = {
            newProduct: {
                name : "",
                slug : "",
                description : "",
                price : "",
                active : true,
                tags : []
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

handleChange = name => event => {
    this.setState({
        newProduct:{
            ...this.state.newProduct,
            [name]: event.target.value,
        }
    });
};

handleChangeName = name => e => {
    console.log(e);
    this.setState({
        newProduct:{
            ...this.state.newProduct,
            name: e.target.value,
        }
    });
};

handleChangeStatus = event => {
    this.setState({
        newProduct:{
            ...this.state.newProduct,
            active: event.target.checked
        }
    });
}

handleSubmit(e){
    console.log("Form submited!");
    e.preventDefault();
}

  render() {
    const { classes } = this.props;
    const { active } = this.setState;

    return (
        <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <TextField
                        value={this.state.newProduct.name}
                        required  
                        id="outlined-required"
                        label="Name"
                        defaultValue="Product name"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        handleChange={this.handleChangeName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={this.state.newProduct.description}
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
                </Grid>

                <Grid item xs={4}>
                    <TextField
                        value={this.state.newProduct.slug}
                        id="outlined-dense"
                        label="Slug"
                        className={classNames(classes.textField, classes.dense)}
                        margin="normal"
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={4}>
                    <TextField
                        value={this.state.newProduct.price}
                        id="outlined-number"
                        label="Price"
                        
                        type="number"
                        className={classNames(classes.textField, classes.dense)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={4}>
                    <TextField
                        value={this.state.newProduct.tags}
                        id="outlined-search"
                        label="Tags"
                        type="search"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormControlLabel
                        control={ <Switch checked={this.state.newProduct.active} onChange={this.handleChangeStatus} aria-label="StatusSwitch" /> }
                        label={active ? 'Active' : 'Inactive'}
                    />
                </Grid>

                <Grid container direction="column" justify="flex-end" alignItems="flex-end" style={{ padding: 20 }}>
                    
                    <Button variant="contained" color="secondary" size="large" className={classes.button}>
                        <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                            Save
                    </Button>
                </Grid>

            </Grid>
        </form>
    );
  }
}

ProductForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductForm);