import React, { Component } from 'react';
import Format from 'date-fns/format';
import differenceInHours from 'date-fns/difference_in_hours'
import Dialog from "@material-ui/core/Dialog/Dialog";
import Button from "@material-ui/core/Button/Button";
import Paper from "@material-ui/core/es/Paper/Paper";
const config = require('../../utils/storage')

class MyBooking extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bookings: null,
            current_user: null,
            dialog: false,
            booking_id: null
        }
    }

    componentWillMount() {
        const obj = config.getFromStorage('the_main_app');

        if (obj && obj.token) {
            this.setState({token: obj.token})
            const $this = this;

            config.getUserFromToken(obj.token).then((user) => {
                this.setState({current_user: user})

                fetch('/api/booking/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: user._id,
                    })
                }).then(res => res.json())
                    .then(function (json) {
                        $this.setState({bookings: json})
                    })
            })
        }
    }

    render() {
        const { bookings } = this.state;

        return (
            <div style={{padding: '2em'}}>
                <h3>Mes réservations en cours</h3>

                <ul style={{padding: '0'}}>
                    {
                        (bookings) ? bookings.current_bookings.map((booking) =>
                            <div>
                                <Paper elevation={3} key={booking._id} style={{padding: '1em'}}>
                                    <span>Covoit avec {booking.driver.firstName} {booking.driver.lastName} !</span><br/><br/>
                                    <span><b>Départ</b> : {booking.marker.placeStart.place_name}</span><br/>
                                    <span><b>Arrivée</b> : {booking.marker.placeEnd.place_name}</span><br/>
                                    <span><b>Date</b> : {Format(booking.marker.departureDate, 'yyyy-MM-dd HH:mm')}</span><br/><br/>
                                    {
                                        ( differenceInHours(new Date(booking.marker.departureDate), new Date()) >= 24 ) ?
                                            <Button variant="contained" color="secondary" onClick={ () => {this.openDialog(booking._id)} } >Annuler</Button>
                                            : null
                                    }
                                </Paper><br/>
                            </div>
                        ) : null
                    }
                </ul>

                <h3>Mes réservations passées</h3>
                {
                    (bookings) ? bookings.past_bookings.map((booking) =>
                        <div>
                            <Paper elevation={3} key={booking._id} style={{padding: '1em'}}>
                                <span>Covoit avec {booking.driver.firstName} {booking.driver.lastName} !</span><br/>
                                <span>Départ : {booking.marker.placeStart.place_name}</span><br/>
                                <span>Arrivée : {booking.marker.placeEnd.place_name}</span><br/>
                                <span>Date : {Format(booking.marker.departureDate, 'yyyy-MM-dd HH:mm')}</span>
                            </Paper><br/>
                        </div>
                    ) : null
                }

                <Dialog open={this.state.dialog} className="dialog-save" onBackdropClick={this.closeDialog}>
                    <p>Êtes vous sûr d'annuler cette réservation ?</p>

                    <Button variant="contained"
                            color="secondary" onClick={this.cancelBooking} >Oui</Button>
                    <Button variant="contained"
                            color="primary"
                            onClick={this.closeDialog}>Non</Button>
                </Dialog>
            </div>
        )
    }

    // dialog
    openDialog = (id) => {
        this.setState({
            dialog: true,
            booking_id: id
        })
    }
    closeDialog = () => {
        this.setState({dialog: false})
    }

    cancelBooking = () => {
        const $this = this;
        const { booking_id } = this.state;

        fetch('/api/booking/cancel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: booking_id
            })
        }).then(res => res.json())
            .then(function (json) {
                if (json.success) {
                    $this.closeDialog();
                    $this.componentWillMount();
                }
            })
    }

}

export default (MyBooking)