import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {TextField, withStyles, Switch, FormControlLabel, Grid, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Add';

import api from '../../services/api';

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
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
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
        
    }

handleChange = event => {
    let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    this.setState({
        newProduct:{
            ...this.state.newProduct,
            [event.target.name]: value,
        }
    });
};

handleSubmit(e){
    console.log("Form submited!");
    e.preventDefault();

    let tagsA = [];
    tagsA.push(this.state.newProduct.tags);
    this.setState({
        newProduct:{
            ...this.state.newProduct,
            tags: tagsA,
        }
    });

    this.saveProduct();    
}

saveProduct = async () => {
    console.log(this.state.newProduct);

    let axiosConfig = { headers: { 'Content-Type': 'application/json;charset=UTF-8', "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNDgxNGM3MmU4YTRiMjkyNDk4Nzk1OSIsImVtYWlsIjoiYXJyOTByakBnbWFpbC5jb20iLCJuYW1lIjoiQXJ0aHVyIFJlaXMiLCJyb2xlcyI6WyJ1c2VyIiwiYWRtaW4iXSwiaWF0IjoxNTMxNDUxNjM2LCJleHAiOjE1MzE1MzgwMzZ9.uJFIgn-F6QCzhqcLls5FiMPk43E_n2JPD7XHtbUfTQU", } };
    const response = await api.post('/products', this.state.newProduct, axiosConfig);
    console.log(response.data);
}

  render() {
    const { classes } = this.props;

    return (
        <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <TextField
                        name="name"
                        value={this.state.newProduct.name}
                        required  
                        id="outlined-required"
                        label="Name"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="description"
                        value={this.state.newProduct.description}
                        required
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows="4"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        />
                </Grid>

                <Grid item xs={4}>
                    <TextField
                        name="slug"
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
                        name="price"
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
                        name="tags"
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
                        name="active"
                        control={ <Switch checked={this.state.newProduct.active} aria-label="StatusSwitch" /> }
                        label={this.state.newProduct.active ? 'Active' : 'Inactive'}
                    />
                </Grid>

                <Grid container direction="column" justify="flex-end" alignItems="flex-end" style={{ padding: 20 }}>
                    
                    <Button type="submit" variant="contained" color="secondary" size="large" className={classes.button}>
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