import React, { Component } from 'react';
import mapBox from 'mapbox-gl'

const MAPBOX_API_TOKEN = 'pk.eyJ1IjoibG91aXNiZXJ0aW4iLCJhIjoiY2pvOHo5OWM2MDAwazNycDBqdmg4dDNlaSJ9.dG2toPupuK_AbxZtAyqINQ'
const mapStyle = {
    height: '500px',
    width: '100%'
};
let map;

class Map extends Component {

    componentDidMount() {
        mapBox.accessToken = MAPBOX_API_TOKEN;
        map = new mapBox.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
            center: [-71.062981, 48.428940], // starting position [lng, lat]
            zoom: 9 // starting zoom
        });
        this.getMarkers()
    }

    render() {

        return (
            <div>
                <div id="map" style={mapStyle}/>
            </div>
        )

    }

    getMarkers = () => {
        fetch('/api/markers')
            .then(res => res.json())
            .then((json) => {
                for (let marker of json) {
                    new mapBox.Marker()
                        .setLngLat([marker.lng, marker.lat])
                        .addTo(map);
                }
            })
    }

}

export default Map