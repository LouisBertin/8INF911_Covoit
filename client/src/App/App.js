import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Contact from './pages/Contact';

class App extends Component {
    render() {
        const App = () => (
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>

                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/contact' component={Contact}/>
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