import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Booking from './Booking/Booking'
import Delete from './Delete/Delete'
import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapBox from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
const config = require('../utils/config')
const MapboxCircle = require('mapbox-gl-circle');
const MAPBOX_API_TOKEN = config.MAPBOX_API_TOKEN
const mapStyle = {
    height: '600px',
    width: '100%',
    margin: '3em 0'
};
let map;
let marker_circle;
let circle_radius = config.CIRCLE_SIZE;
let all_markers = [];
var userlng;
var userlat;

class Map extends Component {

    constructor(props) {
        super(props);

        this.state = {
            is_mounted_booking: true
        }
    }

    componentDidMount() {
        mapBox.accessToken = MAPBOX_API_TOKEN;
        // init map
        map = new mapBox.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
            center: [-71.062981, 48.428940], // starting position [lng, lat]
            zoom: 9 // starting zoom
        });

        this.propsManager()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.is_mounted_booking !== prevState.is_mounted_booking) {
            this.mountBooking();
            this.getMarkersInBounds(marker_circle.getCenter(), circle_radius);
        }

        if (marker_circle)
            this.updateCircleRadius(this.props.circle[1])
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
        const $this = this;

        // GeolocateControl object
        let geolocate = new mapBox.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: false
        });
        map.addControl(geolocate);

        geolocate.on('geolocate', function(data) {
            let user_location = data.coords
            if (user_location) {
                const user_lat = user_location.latitude;
                const user_lng = user_location.longitude;
                userlat = user_lat;
                userlng = user_lng;
                if ($this.props.circle) {
                    const is_user_circle = $this.props.circle[0];

                    if (is_user_circle) {
                        marker_circle = new MapboxCircle({lat: user_lat, lng: user_lng}, circle_radius, {
                            fillColor: config.CIRCLE_COLOR
                        }).addTo(map);
                        $this.getMarkersInBounds(marker_circle.getCenter(), circle_radius)
                    }
                }
            }
        });

    }

    // location search bar
    geocoderBar = () => {
        // bind component
        let $this = this;
        let geocoder = new MapboxGeocoder({
            accessToken: mapBox.accessToken
        });
        // geocoder bar element
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

        // geolocate user element
        let geolocate = new mapBox.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: false
        });
        map.addControl(geolocate);

        geolocate.on('geolocate', function(data) {
            let user_location = data.coords
            if (user_location) {
                const user_lat = user_location.latitude;
                const user_lng = user_location.longitude;

                $this.props.updateLat(user_lat);
                $this.props.updateLng(user_lng);
            }
        });
    }

    // only display user markers
    userMarker = (token) => {
        const $this = this;
        const url = '/api/markers/token?token=' + token;
        console.log('In map : ' + $this.props.loggedIn);
        fetch(url)
            .then(res => res.json())
            .then(json => {
                for (let marker of json) {
                    const placeholder = document.createElement('div');
                    ReactDOM.render(<Delete id={marker._id} userMarker={this.userMarker} loggedIn={$this.props.loggedIn}
                                            userlat={userlat} userlon={userlng}/>, placeholder);
                    const popup = new mapBox.Popup({offset: 25})
                        .setDOMContent(placeholder)
                    new mapBox.Marker()
                        .setLngLat([marker.lng, marker.lat])
                        .addTo(map)
                        .setPopup(popup)
                    ;

                }

            })
            .catch(function(err) {
                console.log('Fetch Error : ', err);
            });

    }

    updateCircleRadius = (radius) => {
        marker_circle.setRadius(radius)
        circle_radius = radius
        this.getMarkersInBounds(marker_circle.getCenter(), circle_radius)
    }

    // get markers in current bounds
    getMarkersInBounds = (lat_lng, radius) => {
        const $this = this;

        fetch('/api/markers/bounds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bounds: lat_lng,
                radius: radius
            })
        }).then(res => res.json())
            .then(json => {
                if (all_markers !== undefined) {
                    for (let marker of all_markers) {
                        marker.remove()
                    }
                    all_markers = []
                }

                // build markers json
                let geojson = {
                    "markers": []
                }
                for (let marker of json) {
                    marker = {
                            "properties": {
                                "userId": marker.userId,
                                "markerId": marker._id
                            },
                            "geometry": {
                                "coordinates": [
                                    marker.lng,
                                    marker.lat
                                ]
                            },
                            "bookings": marker.booking,
                            "user": {
                                "id": marker.user[0]._id,
                                "firstName": marker.user[0].firstName,
                                "lastName": marker.user[0].lastName,
                                "email": marker.user[0].email
                            }
                        };
                    geojson.markers.push(marker)
                }

                // add marker to map
                if (geojson.markers.length > 0) {
                    geojson.markers.forEach(function(marker) {
                        const placeholder = document.createElement('div');

                        if ($this.state.is_mounted_booking) {
                            ReactDOM.render(<Booking marker={marker}
                                                     loggedIn={$this.props.loggedIn}
                                                     notify={$this.props.notify}
                                                     unMountBooking={$this.unMountBooking}
                            />, placeholder);
                        }

                        const popup = new mapBox.Popup({ offset: 25 })
                            .setDOMContent(placeholder)
                        marker = new mapBox.Marker()
                            .setLngLat(marker.geometry.coordinates)
                            .setPopup(popup)
                            .addTo(map);

                        all_markers.push(marker)
                    });
                }
            })
    }

    // update states
    mountBooking = () => {
        this.setState({is_mounted_booking: true})
    };
    unMountBooking = () => {
        this.setState({is_mounted_booking: false})
    }

}

export default Map