import React, { Component } from 'react';
import './Home.css';
import Map from "../../components/Map";

class Home extends Component {

    render() {
        return (
            <div>
                <Map
                    getMarkers={true}
                    userGeolocate={true}
                />
            </div>
        )
    }
}

export default Home;
