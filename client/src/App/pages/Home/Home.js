import React, { Component } from 'react';
import './Home.css';
import { getFromStorage, setInStorage } from "../../utils/storage";

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            token : '',
            signUpError: '',
            signInError: '',
            // signIn
            signInEmail: '',
            signInPassword: '',
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
                    })
                } else {
                    this.setState({
                        signInError: json.message,
                    })
                }
            })
    }

    // logout
    onLogOut = (event) => {
        const obj = getFromStorage('the_main_app');

        if (obj && obj.token) {
            const { token } = obj;

            fetch('/api/account/logout?token=' + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            token: '',
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
    };

    render() {

        const { isLoading, token, signInError, signUpError, signInEmail, signInPassword, signUpFirstName, signUpLastName, signUpEmail, signUpPassword } = this.state;

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
                        {
                            (signUpPassword) ? (
                                <p>{signUpError}</p>
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

                    <br/>

                    <div>
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
            <div className="Home">
                <p>Account</p>
                <button onClick={this.onLogOut}>Logout</button>
            </div>
        );
    }
}

export default Home;
