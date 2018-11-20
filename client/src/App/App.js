import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import Trajet from './pages/Trajet/Trajet';
import SignUp from "./pages/Auth/SignUp/SignUp";
import SignIn from "./pages/Auth/SignIn/SignIn";
import Footer from "./pages/Layout/Footer";
import Header from "./pages/Layout/Header";
import {getFromStorage} from "./utils/storage";
import Index from "./pages/profile/Index";
import Show from "./pages/profile/markers/Show";

class App extends Component {

    constructor (props) {
        super(props);

        this.state = {
            loggedIn: false
        };
    }

    loggedIn = () => {
        this.setState({
            loggedIn: true
        });
    };

    componentDidMount() {
        const obj = getFromStorage('the_main_app');

        if (obj && obj.token) {
            const { token } = obj;

            fetch('/api/account/verify?token=' + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            loggedIn: true,
                        })
                    } else {
                        this.setState({
                            loggedIn: false,
                        })
                    }
                })
        }
    }

    render() {
        const App = () => (
            <div className="app">
                <Header loggedIn={this.state.loggedIn}/>

                <main>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/contact' component={Contact}/>
                        <Route path='/trajet' component={Trajet}/>
                        <Route path='/signup' component={SignUp}/>
                        <Route
                            path='/signin'
                            render={(props) => <SignIn {...props} loggedIn={this.loggedIn.bind(this)} />}
                        />

                        {
                            /* Authenticated routes */
                            (this.state.loggedIn) ? (
                                <React.Fragment>
                                    <Route path='/user/profile' component={Index}/>
                                    <Route path='/user/markers/show' component={Show}/>
                                </React.Fragment>
                            ) : null
                        }

                    </Switch>
                </main>

                <Footer/>
            </div>
        )
        return (
            <Switch>
                <App/>
            </Switch>
        );
    }
}

export default App;