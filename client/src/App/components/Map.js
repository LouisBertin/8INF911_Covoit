import React, { Component } from 'react';
import mapBox from 'mapbox-gl'
import mapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
const config = require('../utils/config')

const MAPBOX_API_TOKEN = config.MAPBOX_API_TOKEN
const mapStyle = {
    height: '600px',
    width: '100%',
    margin: '3em 0'
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

        this.propsManager()
    }

    // deal with all props
    propsManager = () => {
        let is_user_marker = null; let user_token = null
        if (this.props.userMarker) {
            is_user_marker = this.props.userMarker[0]
            user_token = this.props.userMarker[1]
        }

        if (this.props.getMarkers)
            this.getMarkers();
        if (this.props.geocoderBar)
            this.geocoderBar();
        if (this.props.userGeolocate)
            this.userGeolocate();
        if (is_user_marker)
            this.userMarker(user_token);
    }

    render() {
        return (
            <div>
                <div id="map" style={mapStyle}/>
            </div>
        )
    }

    // get all markers and display them
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

    // enable user geolocation
    userGeolocate = () => {
        map.addControl(new mapBox.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        }));
    }

    // location search bar
    geocoderBar = () => {
        // bind component
        let $this = this;
        let geocoder = new mapboxGeocoder({
            accessToken: mapBox.accessToken
        });
        map.addControl(geocoder);

        map.on('load', function() {
            map.addSource('single-point', {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": []
                }
            });

            map.addLayer({
                "id": "point",
                "source": "single-point",
                "type": "circle",
                "paint": {
                    "circle-radius": 10,
                    "circle-color": "#007cbf"
                }
            });

            // on geocode result
            geocoder.on('result', function(event) {
                const lng = event.result.center[0];
                const lat = event.result.center[1];

                map.getSource('single-point').setData(event.result.geometry);
                $this.props.updateLat(lat);
                $this.props.updateLng(lng);
            });
        });
    }

    // only display user markers
    userMarker = (token) => {
        const url = '/api/markers/token?token=' + token;
        fetch(url)
            .then(res => res.json())
            .then(json => {
                for (let marker of json) {
                    new mapBox.Marker()
                        .setLngLat([marker.lng, marker.lat])
                        .addTo(map);
                }
            })
            .catch(function(err) {
                console.log('Fetch Error : ', err);
            });
    }

}

export default Map