import React, { Component } from 'react';
import './Home.css';
import Map from "../../components/Map";

class Home extends Component {

    render() {
        return (
            <div>
                <h1>Home here!</h1>
                <Map getMarkers={true} />
            </div>
        )
    }
}

export default Home;
