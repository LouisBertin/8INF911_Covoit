import React, { Component } from 'react';
import './Home.css';
import Customers from "../../components/customers/customers";
import Prices from "../../components/prices/prices";
import Cats from "../../components/cats/Cats";

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
