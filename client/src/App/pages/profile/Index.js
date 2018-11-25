import React, { Component } from 'react';
import {getFromStorage} from "../../utils/storage";
import Map from "../../components/Map";

class Index extends Component {

    constructor(props) {
        super(props)

        this.state = {
            lng: '',
            lat: '',
            errorMsg: '',
            userToken: '',
            is_mounted: true
        }
    }

    componentWillMount() {
        const obj = getFromStorage('the_main_app');
        if (obj.token) {
            this.setState({userToken: obj.token})
        }
    };

    render () {
        const {userToken, errorMsg, is_mounted} = this.state;

        return (
            <div>
                <h3>Profile page </h3>

                {
                    (errorMsg) ? (
                        <p>{errorMsg}</p>
                    ) : null
                }

                {
                    (is_mounted) ? (<Map geocoderBar={true}
                                         userMarker={[true, userToken]}
                                         updateLng={this.updateLng}
                                         updateLat={this.updateLat}
                                         userlat={this.state.lat}
                                         userlng={this.state.lng}
                    />) : null
                }


                <button onClick={this.onAddMarker}>Send</button>
            </div>
        )
    }

    // updateStates
    updateLng = (value) => {
        this.setState({lng: value})
    };
    updateLat = (value) => {
        this.setState({lat: value})

    };

    mounted = () => {
        this.setState({is_mounted: true})
    };
    unmounted = () => {
        this.setState({is_mounted: false})
    };

    // onClick
    onAddMarker = () => {
        const {
            lat,
            lng,
            userToken
        } = this.state;

        fetch('/api/markers/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lat: lat,
                lng: lng,
                token: userToken
            })
        }).then(res => res.json())
            .then(json => {
                if (!json.success) {
                    this.setState({errorMsg: json.message})
                } else {
                    this.setState({errorMsg: 'Congratulations'});
                    this.unmounted();
                    this.mounted();
                }
            })
    }

}

export default Index