import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TextField, withStyles, Switch, FormControlLabel, Grid, Button, Popover, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Add';
import NumberFormat from 'react-number-format';

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
    menu: {
        width: 0,
    }
});

class ProductForm extends React.Component {

    constructor(props) {
        super(props);        
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.state = {
            tokenid: "",
            newProduct: {
                title : "",
                slug : "",
                description : "",
                price : "",
                active : true,
                tags : []
            },
            popUp : {
                opened: false,
                message: "",
            },
        };
        
    }

    componentDidMount(){
        const token = localStorage.getItem("mstore-tokenid");
        this.setState( { tokenid: token } );
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

    handleChange2 = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    handleSubmit = e => {
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

        this.saveProduct().then(function(res){
            console.log(res);
            this.resetForm();
            this.handleShowPopover(res.data.message);
        }).catch((error) => {
            switch (error.response.status) {
                case 401:
                    console.warn(error.response.data.message);
                    break;
                case 400:
                    console.warn(error.response.data.message);
                    break;
                default:
                    console.warn(error.response.data.message);
                    break;
            }
            let message;
            if(error.response.data.length > 1){
                error.response.data.forEach(msg => {
                    message+=msg.message+"</br>";
                });
            }else{
                message = error.response.data.message;
            }
            this.handleShowPopover(message);
        });
    }

    handleClosePopover = () => {
        this.setState({popUp: {opened: false, message: null}});
    };

    handleShowPopover = (message) => {
        this.setState({popUp: {opened: true, message: message}});
    };

    saveProduct = async () => {
        console.log("saving product...");        
        let axiosConfig = { headers: { 'Content-Type': 'application/json;charset=UTF-8', "x-access-token": this.state.tokenid, } };
        const response = await api.post('/products', this.state.newProduct, axiosConfig);
        return response;
    }

    resetForm = () => {
        this.setState({
            newProduct: {
                title : "",
                slug : "",
                description : "",
                price : "",
                active : true,
                tags : []
        }})
    }

    render() {
        const { classes } = this.props;
        
        const { opened } = this.state.popUp;
        const open = Boolean(opened);

    return (
        <div>
            <Popover
                id="simple-popper"
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
            </Popover>
        
            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField
                            name="title"
                            value={this.state.newProduct.title}
                            required  
                            id="outlined-required"
                            label="Title"
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

                    <Grid item xs={5}>
                        <TextField
                            name="slug"
                            value={this.state.newProduct.slug}
                            id="outlined-dense"
                            label="Slug"
                            className={classNames(classes.textField)}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            />
                    </Grid>

                    <Grid item xs={2}>
                    </Grid>

                    <Grid item xs={5}>

                        <TextField
                            name="price"
                            value={this.state.newProduct.price}
                            id="formatted-numberformat-input"
                            label="Price"
                            className={classNames(classes.textField)}
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                            }}
                        />
                        
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            name="tags"
                            value={this.state.newProduct.tags}
                            id="outlined-search"
                            label="Tags"
                            type="search"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControlLabel
                            name="active"
                            control={ <Switch checked={this.state.newProduct.active} aria-label="StatusSwitch" /> }
                            label={this.state.newProduct.active ? 'Active' : 'Inactive'}
                        />
                    </Grid>

                    <Grid container direction="column" justify="flex-end" alignItems="flex-end" >
                        
                        <Button type="submit" variant="contained" color="secondary" size="large" className={classes.button}>
                            <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                                Save
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </div>
    );
  }
}

ProductForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={values => {
            onChange({
            target: {
                value: values.value,
            },
            });
        }}
        prefix="R$"
        />
    );
}
  
NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(ProductForm);