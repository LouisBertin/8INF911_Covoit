import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {getFromStorage} from "../../utils/storage";

const config = require('../../utils/storage');

const overrideStyles = {
    padding: "5em",
    margin: "5em"
};

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
                this.setState({token: obj.token});
                config.getUserFromToken(obj.token).then((user) => {
                    this.setState({current_user: user})
                })
            }
        }
    }

    render() {
        const {firstName, lastName} = this.props.marker.user;
        const {currentSeats, totalSeats} = this.props.marker.seats;
        const {loggedIn} = this.props;
        const is_current_user = (this.state.current_user._id === this.props.marker.user.id) ? true : null;
        const is_booked = this.isBooked();

        return (
            <div>
                <p>Driver : {firstName} {lastName}</p>
                <p>Places : {(currentSeats === undefined) ? 0 : currentSeats} / {totalSeats}</p>
                {
                    (loggedIn) ? (
                        (!is_current_user) ? (
                            (currentSeats !== totalSeats) ? (
                                (!is_booked) ? (
                                    <Button color="primary" variant="contained" onClick={this.handleButtonClick}>
                                        Réserver
                                    </Button>
                                ) : <p style={{color: "blue"}}><b>réservé</b></p>
                            ) : <p style={{color: "red"}}><b>CoVoit complet!</b></p>
                        ) : <p style={{color: "green"}}><b>c'est ton marqueur boy!</b></p>
                    ) : <p style={{color: "red"}}><b>Veuillez vous connecter pour réserver</b></p>
                }

                <Dialog
                    open={this.state.open}
                    fullWidth={true}
                    style={overrideStyles}
                    onBackdropClick={this.closeModal}
                >
                    <div style={{padding: "2em", textAlign: "center"}}>
                        <h3>Hello {firstName} {lastName}</h3>
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
                marker_id: $this.props.marker.properties.markerId,
            })
        }).then(res => res.json())
            .then(function (json) {
                if (json.success) {
                    $this.closeModal();
                    $this.props.notify('Covoit réservé!');
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