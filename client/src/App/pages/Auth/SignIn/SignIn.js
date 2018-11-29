import React, {Component} from 'react';
import {getFromStorage, setInStorage} from "../../../utils/storage";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import './SignIn.css'

const styles = theme => ({
    layout: {
        width: "auto",
        display: "block", // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: "auto",
            marginRight: "auto"
        }
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
            .spacing.unit * 3}px`
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing.unit
    },
    submit: {
        marginTop: theme.spacing.unit * 3
    }
});


class SignIn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            token: '',
            signInError: '',
            // signIn
            signInEmail: '',
            signInPassword: '',
        }
    }

    componentDidMount() {
        const obj = getFromStorage('the_main_app');

        if (obj && obj.token) {
            const {token} = obj;

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
        event.preventDefault();

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
                    setInStorage('the_main_app', {token: json.token})
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
        const {isLoading, token, signInError, signInEmail, signInPassword} = this.state;

        if (isLoading) {
            return (
                <div><p>Loading...</p></div>
            )
        }

        if (!token) {
            return (
                <div>
                    <h2 className="TitleSignIn">Connexion</h2>
                    <div>
                        {
                            (signInError) ? (
                                <p>{signInError}</p>
                            ) : null
                        }
                        <Paper className="lll">

                            <form onSubmit={this.onSignIn}>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="email">Adresse e-mail</InputLabel>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={signInEmail}
                                        onChange={this.handleSignInEmail}
                                    />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="password">Mot de passe</InputLabel>
                                    <Input
                                        type="password"
                                        name="password"
                                        value={signInPassword}
                                        onChange={this.handleSignInPassword}
                                    />
                                </FormControl>
                                <br/><br/>
                                <Button type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary">Sign in</Button>
                            </form>
                        </Paper>
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

const MySingInStyled = withStyles(styles)(SignIn);

export default MySingInStyled;
