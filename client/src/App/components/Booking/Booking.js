import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {getFromStorage} from "../../utils/storage";
import Format from 'date-fns/format';
const config = require('../../utils/storage')

const overrideStyles = {
    padding: "5em",
    margin: "5em"
}

class Booking extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            token: null,
            current_user: {}
        };
    }

    componentWillMount() {
        if (this.props.loggedIn) {
            const obj = getFromStorage('the_main_app');

            if (obj && obj.token) {
                this.setState({token: obj.token})
                config.getUserFromToken(obj.token).then((user) => {
                    this.setState({current_user: user})
                })
            }
        }
    }

    render() {
        const {firstName, lastName} = this.props.marker.user;
        const {currentSeats, totalSeats} = this.props.marker.seats;
        const { place_end, departure_date } = this.props.marker.misc;
        const {loggedIn} = this.props;
        const is_current_user = (this.state.current_user._id === this.props.marker.user.id) ? true : null;
        const is_booked = this.isBooked();

        return (
            <div>
                <p><b>Conducteur</b> : {firstName} {lastName}</p>
                <p><b>Date</b> : {Format(departure_date, 'yyyy-MM-dd HH:mm')}</p>
                <p><b>Arrivée</b> : {place_end}</p>
                <p><b>Places</b> : {(currentSeats === undefined) ? 0 : currentSeats} / {totalSeats}</p>
                {
                    (loggedIn) ? (
                        (!is_current_user) ? (
                            (currentSeats !== totalSeats) ? (
                                (!is_booked) ? (
                                    <Button color="primary" variant="contained" onClick={this.handleButtonClick}>
                                        Réserver
                                    </Button>
                                ) : <p style={{color: "blue", textAlign: 'center'}}><b>Réservé</b></p>
                            ) : <p style={{color: "red"}}><b>CoVoit complet!</b></p>
                        ) : <p style={{color: "green"}}><b>C'est votre trajet</b></p>
                    ) : <p style={{color: "red"}}><b>Veuillez vous connecter pour réserver</b></p>
                }

                <Dialog
                    open={this.state.open}
                    fullWidth={true}
                    style={overrideStyles}
                    onBackdropClick={this.closeModal}
                >
                    <div style={{padding: "2em", textAlign: "center"}}>
                        <p><b>Conducteur</b> : {firstName} {lastName}</p>
                        <p><b>Date</b> : {Format(departure_date, 'yyyy-MM-dd HH:mm')}</p>
                        <p><b>Arrivée</b> : {place_end}</p>
                        <p>Êtes-vous sûr de vouloir réserver ?</p>
                        <Button color="primary" variant="contained" onClick={this.validateBooking}>
                            Valider
                        </Button>
                    </div>
                </Dialog>
            </div>
        )
    }

    handleButtonClick = () => {
        this.openModal()
    };

    validateBooking = () => {
        const $this = this;

        fetch('/api/booking/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: $this.state.current_user._id,
                driver_id: $this.props.marker.user.id,
                marker_id: $this.props.marker.properties.markerId
            })
        }).then(res => res.json())
            .then(function (json) {
                if (json.success) {
                    $this.closeModal();
                    $this.props.notify('Covoit réservé!')
                    $this.props.unMountBooking()
                }
            })
    };

    isBooked = () => {
        for (let book of this.props.marker.bookings) {
            if (String(this.state.current_user._id) === book.userId) {
                return true;
            }
        }
    };

    openModal = () => {
        this.setState({open: true})
    };

    closeModal = () => {
        this.setState({open: false})
    };

}

export default Booking