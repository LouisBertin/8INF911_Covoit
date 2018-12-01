import React, { Component } from 'react';
import Format from 'date-fns/format';
import differenceInHours from 'date-fns/difference_in_hours'
const config = require('../../utils/storage')

class MyBooking extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bookings: null,
            current_user: null
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
            <div>

                <h3>Mes réservations en cours</h3>
                <ul>
                    {
                        (bookings) ? bookings.current_bookings.map((booking) =>
                            <div key={booking._id}>
                                <li>
                                    <span>Covoit avec {booking.driver.firstName} {booking.driver.lastName} !</span><br/>
                                    <span>Départ : {booking.marker.placeStart.place_name}</span><br/>
                                    <span>Arrivée : {booking.marker.placeEnd.place_name}</span><br/>
                                    <span>Date : {Format(booking.marker.departureDate, 'yyyy-MM-dd HH:mm')}</span>
                                </li>
                                {
                                    (differenceInHours(new Date(booking.marker.departureDate)), new Date() >= 24) ? <button onClick={ () => {this.cancelBooking(booking._id)} }>Annuler</button> : null
                                }
                            </div>
                        ) : null
                    }
                </ul>

                <h3>Mes réservations passées</h3>
                <ul>
                    {
                        (bookings) ? bookings.past_bookings.map((booking) =>
                            <li key={booking._id}>
                                <span>Covoit avec {booking.driver.firstName} {booking.driver.lastName} !</span><br/>
                                <span>Départ : {booking.marker.placeStart.place_name}</span><br/>
                                <span>Arrivée : {booking.marker.placeEnd.place_name}</span><br/>
                                <span>Date : {Format(booking.marker.departureDate, 'yyyy-MM-dd HH:mm')}</span>
                            </li>
                        ) : null
                    }
                </ul>

            </div>
        )
    }

    cancelBooking = (id) => {
        const $this = this;

        fetch('/api/booking/cancel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        }).then(res => res.json())
            .then(function (json) {
                if (json.success) {
                    $this.componentWillMount()
                }
            })
    }

}

export default (MyBooking)