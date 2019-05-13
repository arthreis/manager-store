import React, { Component } from 'react';
import { Grid, TextField, InputAdornment, IconButton, Button, Typography, Popover } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Redirect } from 'react-router';

import { validarToken, login } from './../../services/auth-service';

class Login extends Component {

    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.signIn = this.signIn.bind(this);

        this.state = {
            user: {
                email: "",
                password: ""
            },
            showPassword: false,
            popUp : {
                opened: false,
                message: "",
            },
            auth: false,
        };
    }

    componentDidMount() {
        this.validarSessao();
    }

    validarSessao = async () => {
       const data = await validarToken();
        if(!data) {
            console.log("Redirect to login page");            
        } else {
            this.setState(() => ( { auth: true } ));
        }
    }

    handleChange = event => {
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({
            user:{
                ...this.state.user,
                [event.target.name]: value,
            }
        });
    };

    signIn = async () => {
        const data = await login(this.state.user);
        if(data.message){
            console.warn(data.message);
            this.handleShowPopover(data.message)
        }else{
            console.log("TODO redirecionar para pagina principal");
            this.setState(() => ( { auth: true } ));
        }
        
        /*await api.post("/customers/authenticate", this.state.user).then(response => {
            const { token } = response.data;
            console.log("logged !");
            localStorage.setItem("mstore-tokenid", token);
            console.log("TODO redirecionar para pagina principal");
            this.setState(() => ( { toMain: true } ));
            //return response.data.data;
        }).catch(error => {
            console.log(error);            
            this.handleShowPopover(error.response.data.message);
        });*/
    }

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };
    
    handleClosePopover = () => {
        this.setState({popUp: {opened: false, message: null}});
    };

    handleShowPopover = (message) => {
        this.setState({popUp: {opened: true, message: message}});
    };
    
    render() {

        if (this.state.auth) {
            console.log("redirecting to main...");
            return (<Redirect to='/' />);
        }

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
                    <Typography>{this.state.popUp.message}</Typography>
                </Popover>

                <form onChange={this.handleChange}>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-login-required"
                            name="email"
                            value={this.state.user.email}
                            label="Email"
                            margin="normal"
                            variant="outlined"
                            required  
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-password-required"
                            name="password"
                            value={this.state.user.password}
                            label="Password"
                            margin="normal"
                            variant="outlined"
                            type={this.state.showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            required
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="Toggle password visibility"
                                      onClick={this.handleClickShowPassword}
                                    >
                                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                            }}
                            />
                    </Grid>
                    <Button variant="contained" color="secondary" size="large" type="button" onClick={this.signIn}>
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}

export default Login;