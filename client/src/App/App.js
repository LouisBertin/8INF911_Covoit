import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import SignUp from "./pages/Auth/SignUp/SignUp";
import SignIn from "./pages/Auth/SignIn/SignIn";
import Logout from "./components/Logout/Logout";

class App extends Component {
    render() {
        const App = () => (
            <div className="app">
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                    <ul>
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/signin">Sign In</Link></li>
                        <Logout/>
                    </ul>
                </nav>

                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/contact' component={Contact}/>
                    <Route path='/signup' component={SignUp}/>
                    <Route path='/signin' component={SignIn}/>
                </Switch>
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