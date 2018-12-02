import React, { Component } from 'react';
import {getFromStorage} from "../../utils/storage";
import Map from "../../components/Map";
import './Index.css';
import Dialog from '@material-ui/core/Dialog';
import Button from "@material-ui/core/Button/Button";
import TextField from '@material-ui/core/TextField';
import {DateTimePicker} from 'material-ui-pickers';

class Index extends Component {

    constructor(props) {
        super(props)

        this.state = {
            lng: '',
            lat: '',
            latLngEnd: {},
            errorMsg: '',
            userToken: '',
            selectedDate: new Date,
            seats: '',
            is_mounted: true,
            dialog_open: false,
            time_dialog: false
        }
    }

    componentWillMount() {
        const obj = getFromStorage('the_main_app');
        if (obj.token) {
            this.setState({userToken: obj.token})
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.latLngEnd !== prevState.latLngEnd && Object.keys(this.state.latLngEnd).length > 0) {
            this.openDialog()
        }
    }

    render () {
        const {userToken, errorMsg, is_mounted} = this.state;

        return (
            <div className="Profile">
                <h3 className={"Titre"}>Mes trajets</h3>

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

                    <Dialog open={this.state.dialog_open} className="dialog-save"
                            onBackdropClick={this.onBackdropClick}>
                        <p>Votre trajet est-il bien correct ?</p>

                        <Button variant="contained"
                                color="secondary"
                                onClick={this.openTimeDialog}>Oui</Button>
                        <Button variant="contained"
                                color="primary"
                                onClick={this.closeDialog}>Non</Button>
                    </Dialog>

                    <Dialog open={this.state.time_dialog} className="dialog-save"
                            onBackdropClick={this.onBackdropClick}>
                        <h3>Configuration de la course</h3>
                        <TextField
                            id="standard-number"
                            label="Places"
                            value={this.state.seats}
                            onChange={this.handleSeatsChange}
                            type="number"
                            margin="normal"
                        />
                        <DateTimePicker
                            autoOk
                            ampm={false}
                            value={this.state.selectedDate}
                            onChange={this.handleDateChange}
                        />
                        <Button variant="contained"
                                color="primary"
                                onClick={this.onAddMarker}>Oui</Button>
                        <Button variant="contained"
                                color="secondary"
                                onClick={this.onBackdropClick}>Non</Button>
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
        this.setState({
            lng: '',
            lat: '',
            latLngEnd: {}
        });

        this.setState({dialog_open: false})
    };
    handleDateChange = (date) => {
        this.setState({selectedDate: date});
    };
    openTimeDialog = () => {
        this.setState({time_dialog: true})
    }
    closeTimeDialog = () => {
        this.setState({time_dialog: false})
    }
    mounted = () => {
        this.setState({is_mounted: true})
    };
    unmounted = () => {
        this.setState({is_mounted: false})
    };
    handleSeatsChange = (event) => {
        this.setState({seats: event.target.value})
    }

    onBackdropClick = () => {
        this.closeDialog()
        this.closeTimeDialog()
    };
    // onClick
    onAddMarker = () => {
        const {
            lat,
            lng,
            userToken,
            selectedDate,
            seats
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
                latLngEnd: this.state.latLngEnd,
                selectedDate: selectedDate,
                seats: seats
            })
        }).then(res => res.json())
            .then(json => {
                if (!json.success) {
                    this.setState({errorMsg: json.message})
                } else {
                    this.closeDialog();
                    this.closeTimeDialog();
                    this.props.notify('Sauvegardé');
                    this.unmounted();
                    this.mounted();
                }
            })
    }

}

export default Index