let Marker = require('../../models/Marker')
let UserSession = require('../../models/UserSession')
let User = require('../../models/User')
let turf = require('@turf/turf');
let Booking = require('../../models/Booking')

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
        const { token } = req.query;

        UserSession.findOne({ _id: token }, function (err, user_session) {
            const user_id = user_session.userId;
            User.findOne({_id: user_id}, function(err, user) {
                res.json(user)
            });
        });
    })

    app.post('/api/markers/add', (req, res, next) => {

        const {body} = req;
        const {
            lat,
            lng,
            token
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
            User.findOne({ _id: userSession.userId }, function (err, user) {
                let marker = new Marker({
                    lng: lng,
                    lat: lat,
                    userId: user._id
                });
                marker.save();
            });
        });

        return res.send({
            success: true,
            message: 'Congratulations'
        })

    });

    app.post('/api/markers/delete', (req, res, next) => {
        const {body} = req;
        const {
            id
        } = body;

        Marker.deleteOne({ _id: id }, function (err) {
            if (err) return handleError(err);

            return res.send({
                success: true,
                message: 'Marker deleted!'
            })
        });
    })

    app.post('/api/markers/bounds', (req, res, next) => {

        const {body} = req;
        const {
            bounds,
            radius
        } = body

        // setup turf params
        const From = turf.point([bounds.lat, bounds.lng]);
        const options = {units: 'kilometers'};

        // retrieve markers
        Marker.find({}, function(err, markers){
            if(err) {
                console.log(err);
                return
            }

            let current_markers = [];
            // get markers concerned by distance from the user
            const users_ids = markers.map(function (marker) {
                const to = turf.point([marker.lat, marker.lng]);
                const distance = turf.distance(From, to, options) * 1000;

                if (distance <= radius) {
                    current_markers.push(marker)
                    return marker.userId
                }
            });

            // array with markers id only
           let markers_id = current_markers.map(function (marker) {
               return (marker._id).toString();
           })

            // get markers bookings
            Booking.find({
                'markerId': { $in: markers_id}
            }, function(err, bookings) {
                if (err) {
                    console.log(err);
                    return
                }

                // retrieve marker creator aka driver
                User.find({
                    '_id': { $in: users_ids}
                }, function(err, users){
                    if(err) {
                        console.log(err);
                        return
                    }

                    let newMarkers = current_markers.map(function (marker) {
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
        });

    })

}