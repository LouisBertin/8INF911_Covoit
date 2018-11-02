import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import SignUp from "./pages/Auth/SignUp/SignUp";
import SignIn from "./pages/Auth/SignIn/SignIn";
import Logout from "./components/Logout/Logout";
import Footer from "./pages/Layout/Footer";
import Header from "./pages/Layout/Header";

class App extends Component {
    render() {
        const App = () => (
            <div className="app">
                <Header/>

                <main>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/contact' component={Contact}/>
                        <Route path='/signup' component={SignUp}/>
                        <Route path='/signin' component={SignIn}/>
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