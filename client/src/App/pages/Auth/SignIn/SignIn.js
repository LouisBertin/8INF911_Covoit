import React, { Component } from 'react';
import {getFromStorage, setInStorage} from "../../../utils/storage";

class SignIn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            token : '',
            signInError: '',
            // signIn
            signInEmail: '',
            signInPassword: '',
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

    // sign in
    handleSignInEmail = (event) => {
        this.setState({signInEmail: event.target.value})
    };
    handleSignInPassword = (event) => {
        this.setState({signInPassword: event.target.value})
    };
    onSignIn = (event) => {
        const {
            signInEmail,
            signInPassword,
        } = this.state;

        fetch('/api/account/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        }).then(res => res.json())
            .then(json => {
                if (json.success) {
                    setInStorage('the_main_app', { token: json.token })
                    this.setState({
                        signInError: json.message,
                        token: json.token
                    });
                    this.props.loggedIn()
                } else {
                    this.setState({
                        signInError: json.message,
                    })
                }
            })
    }

    render() {
        const { isLoading, token, signInError, signInEmail, signInPassword } = this.state;

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
                            (signInError) ? (
                                <p>{signInError}</p>
                            ) : null
                        }
                        <p>Sign in</p>
                        <input
                            type="email"
                            placeholder="email"
                            value={signInEmail}
                            onChange={this.handleSignInEmail}
                        /><br/>
                        <input
                            type="password"
                            placeholder="password"
                            value={signInPassword}
                            onChange={this.handleSignInPassword}
                        /><br/>
                        <button onClick={this.onSignIn}>Sign in</button>
                    </div>
                </div>
            )
        }

        return (
            <div className="SignIn">
                <p>Account</p>
            </div>
        );
    }
}

export default SignIn;
