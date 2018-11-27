import React, { Component } from 'react';
import {getFromStorage} from "../../utils/storage";
import Map from "../../components/Map";
import './Index.css';
import Dialog from '@material-ui/core/Dialog';

class Index extends Component {

    constructor(props) {
        super(props)

        this.state = {
            lng: '',
            lat: '',
            latLngEnd: {},
            errorMsg: '',
            userToken: '',
            is_mounted: true,
            dialog_open: false
        }
    }

    componentWillMount() {
        const obj = getFromStorage('the_main_app');
        if (obj.token) {
            this.setState({userToken: obj.token})
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.latLngEnd !== prevState.latLngEnd) {
            this.openDialog()
        }
    }

    render () {
        const { userToken, errorMsg, is_mounted } = this.state;

        return (
            <div className="Profile">
                <h3>Profile page</h3>
                <div className="MAP">

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
                                             updateLatLngEnd={this.updateLatLngEnd}
                                             firstLat={this.state.lat}
                                             notify={this.props.notify}
                        />) : null
                    }

                    <Dialog open={this.state.dialog_open} className="dialog-save" onBackdropClick={this.onBackdropClick}>
                        <p>Votre trajet est-il bien correct ?</p>

                        <button onClick={this.onAddMarker} className="">Send</button>
                    </Dialog>
                </div>
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
    updateLatLngEnd = (value) => {
        this.setState({latLngEnd: value})
    };
    openDialog = () => {
        this.setState({dialog_open: true})
    };
    closeDialog = () => {
        this.setState({dialog_open: false})
    };


    mounted = () => {
        this.setState({is_mounted: true})
    };
    unmounted = () => {
        this.setState({is_mounted: false})
    };

    onBackdropClick = () => {
        let $this = this;

        this.setState({
            lng: '',
            lat: '',
            latLngEnd: {}
        }, function () {
            $this.closeDialog()
        })
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
                token: userToken,
                latLngEnd: this.state.latLngEnd
            })
        }).then(res => res.json())
            .then(json => {
                if (!json.success) {
                    this.setState({errorMsg: json.message})
                } else {
                    this.setState({
                        lng: '',
                        lat: '',
                        latLngEnd: {}
                    });

                    this.closeDialog();
                    this.props.notify('Sauvegardé');
                    this.unmounted();
                    this.mounted();
                }
            })
    }

}

export default Index