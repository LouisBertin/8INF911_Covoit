import React, { Component } from 'react';
import './Home.css';
import Customers from "../../components/Customers/customers";
import Prices from "../../components/Prices/prices";
import Cats from "../../components/Cats/Cats";

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <h1>Home here!</h1>
                <Customers/>
                <Prices/>
                <Cats/>
            </div>
        );
    }
}

export default Home;
