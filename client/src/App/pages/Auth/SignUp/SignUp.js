import React, { Component } from 'react';
import {getFromStorage} from "../../../utils/storage";

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

                        <p>Sign up</p>
                        <input
                            type="text"
                            placeholder="firstName"
                            value={signUpFirstName}
                            onChange={this.handleSignUpFirstName}
                        />
                        <br/>
                        <input
                            type="text"
                            placeholder="lastName"
                            value={signUpLastName}
                            onChange={this.handleSignUpLastName}
                        /><br/>
                        <input
                            type="email"
                            placeholder="email"
                            value={signUpEmail}
                            onChange={this.handleSignUpEmail}
                        /><br/>
                        <input
                            type="password"
                            placeholder="password"
                            value={signUpPassword}
                            onChange={this.handleSignUpPassword}
                        /><br/>
                        <button onClick={this.onSignUp}>Sign up</button>
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
