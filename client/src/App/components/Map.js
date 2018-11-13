import React, { Component } from 'react';
import mapBox from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

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

        // enable methods
        if (this.props.getMarkers)
            this.getMarkers()
        if (this.props.geocoderBar)
            this.geocoderBar()
        if (this.props.userGeolocate)
            this.userGeolocate()
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
        let geocoder = new MapboxGeocoder({
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

}

export default Map