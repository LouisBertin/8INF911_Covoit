import React, { Component } from 'react';
import {getFromStorage} from "../../../utils/storage";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            token : '',
            signUpError: '',
            // signUp
            signUpFirstName: '',
            signUpLastName: '',
            signUpEmail: '',
            signUpPassword: ''
        }
    }

    componentDidMount() {
        const obj = getFromStorage('the_main_app');

        if (obj && obj.token) {
            const { token } = obj;

            fetch('/api/account/verify?token=' + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            token: token,
                            isLoading: false
                        })
                    } else {
                        this.setState({
                            isLoading: false,

                        })
                    }
                })
        } else {
            this.setState({
                isLoading: false
            })
        }
    }

    // sign up
    handleSignUpFirstName = (event) => {
        this.setState({signUpFirstName: event.target.value});
    };
    handleSignUpLastName = (event) => {
        this.setState({signUpLastName: event.target.value});
    };
    handleSignUpEmail = (event) => {
        this.setState({signUpEmail: event.target.value});
    };
    handleSignUpPassword = (event) => {
        this.setState({signUpPassword: event.target.value});
    };
    onSignUp = (event) => {
        const {
            signUpFirstName,
            signUpLastName,
            signUpEmail,
            signUpPassword
        } = this.state;

        fetch('/api/account/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: signUpFirstName,
                lastName: signUpLastName,
                email: signUpEmail,
                password: signUpPassword
            })
        }).then(res => res.json())
            .then(json => {
                this.setState({
                    signUpError: json.message,
                })
            })
    };

    render() {

        const { isLoading, token, signUpError, signUpFirstName, signUpLastName, signUpEmail, signUpPassword } = this.state;

        if (isLoading) {
            return (
                <div><p>Loading...</p></div>
            )
        }

        if (!token) {
            return (
                <div>
                    <div>

                        {
                            (signUpError) ? (
                                <p>{signUpError}</p>
                            ) : null
                        }
                        <Paper className="lll">
                        <Typography component="h1" variant="h5" Style="margin:auto;">Sign Up</Typography>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="firstname">First name</InputLabel>
                            <Input
                                type="text"
                                name="firstname"
                                value={signUpFirstName}
                                onChange={this.handleSignUpFirstName}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="lastname">Last name</InputLabel>
                            <Input
                                type="text"
                                namme="lastName"
                                value={signUpLastName}
                                onChange={this.handleSignUpLastName}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="firstname">Email Address</InputLabel>
                            <Input
                                type="email"
                                name="email"
                                value={signUpEmail}
                                onChange={this.handleSignUpEmail}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="firstname">Password</InputLabel>
                        <Input
                            type="password"
                            name="password"
                            value={signUpPassword}
                            onChange={this.handleSignUpPassword}
                        />
                        </FormControl>
                        <Button onClick={this.onSignUp} color="primary" variant={"contained"}>Sign up</Button>
                        </Paper>
                    </div>
                </div>
            )
        }

        return (
            <div className="SignUp">
                <h1>SignUp here!</h1>
            </div>
        );
    }

}

export default SignUp;
