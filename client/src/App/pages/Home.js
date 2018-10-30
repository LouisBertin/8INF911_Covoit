import React, { Component } from 'react';
import './Home.css';
import Customers from "../components/customers/customers";
import Prices from "../components/prices/prices";

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <h1>Home here!</h1>
                <Customers/>
                <Prices/>
            </div>
        );
    }
}

export default Home;
