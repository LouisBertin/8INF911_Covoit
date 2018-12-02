let Marker = require('../../models/Marker')
let UserSession = require('../../models/UserSession')
let User = require('../../models/User')
let Booking = require('../../models/Booking')
let mapboxApi = require('../../helpers/mapboxApi')

module.exports = (app) => {

    app.get('/api/markers', (req, res) => {
        Marker.find({}, function(err, markers) {
            res.json(markers)
        });
    })

    app.get('/api/markers/token', (req, res) => {
        const { token } = req.query;

        // TODO : manage errors
        UserSession.findOne({ _id: token }, function (err, user_session) {
            const user_id = user_session.userId;
                Marker.find({userId: user_id}, function(err, markers) {
                    res.json(markers)
                });
        });
    })

    app.get('/api/markers/user', (req, res) => {
        const {token} = req.query;

        UserSession.findOne({_id: token}, function (err, user_session) {
            const user_id = user_session.userId;
            User.findOne({_id: user_id}, function (err, user) {
                res.json(user)
            });
        });
    })

    app.post('/api/markers/add', (req, res, next) => {

        const {body} = req;
        const {
            lat,
            lng,
            token,
            latLngEnd,
            selectedDate,
            seats
        } = body;

        // TODO: express validator ?
        if (!lat || !lng) {
            return res.send({
                success: false,
                message: 'Error: One field is empty'
            })
        }

        // find user and insert marker in db
        UserSession.findOne({ _id: token }, function (err, userSession) {
            User.findOne({_id: userSession.userId}, async function (err, user) {
                const placeStart = await mapboxApi.placeData(lng, lat)
                const placeEnd = await mapboxApi.placeData(latLngEnd.lng, latLngEnd.lat)

                let marker = new Marker({
                    lng: lng,
                    lat: lat,
                    userId: user._id,
                    latLngEnd: latLngEnd,
                    placeStart,
                    placeEnd,
                    departureDate: selectedDate,
                    totalSeats: seats
                });
                marker.save(function (err) {
                    if (err) return false;

                    return res.send({
                        success: true,
                        message: 'Congratulations'
                    })
                });
            });
        });
    });

    app.post('/api/markers/delete', (req, res, next) => {
        const {body} = req;
        const {
            id
        } = body;

        Marker.deleteOne({ _id: id }, function (err) {
            if (err) return handleError(err);

            Booking.deleteMany({
                'markerId': {$in: id}
            }, function (err, bookings) {
                return res.send({
                    success: true,
                    message: 'Marker deleted!'
                })
            });
        });
    })

    app.post('/api/markers/bounds', (req, res, next) => {

        const {body} = req;
        const {
            bounds,
            radius
        } = body

        // retrieve markers
        Marker.find({departureDate: {$gte: new Date()}}, function (err, markers) {
            if(err) {
                console.log(err);
                return
            }

            // get markers concerned by distance from the user
            const current_markers = markers.map(async function (marker) {
                const test = await mapboxApi.directionDistance([bounds.lat, bounds.lng], [marker.lat, marker.lng]);

                if (test <= radius) {
                    current_markers.push(marker)
                    return marker
                }
            });

            Promise.all(current_markers).then(function (results) {
                let data = results.filter(function (result) {
                    return result !== undefined
                })

                // array with markers id only
                let markers_id = data.map(function (marker) {
                    return (marker._id).toString();
                })
                let users_ids = data.map(function (marker) {
                    return (marker.userId).toString();
                })


                if (markers.length > 0) {
                    // get markers bookings
                    Booking.find({
                        'markerId': {$in: markers_id}
                    }, function (err, bookings) {
                        if (err) {
                            console.log(err);
                            return
                        }

                        // retrieve marker creator aka driver
                        User.find({
                            '_id': {$in: users_ids}
                        }, function (err, users) {
                            if (err) {
                                console.log(err);
                                return
                            }

                            let newMarkers = data.map(function (marker) {
                                // attach driver data to marker he has created
                                let user_data = users.filter(function (user) {
                                    return String(user._id) === marker.userId;
                                });
                                // attach booking data to current marker
                                let booking_data = bookings.filter(function (booking) {
                                    return booking.markerId === String(marker._id)
                                });

                                let new_marker = marker.toJSON(); // convert to a simple JS object
                                new_marker.user = user_data;
                                new_marker.booking = booking_data;

                                return new_marker
                            });

                            res.json(newMarkers)
                        });
                    });
                }
            })
        });

    })

}