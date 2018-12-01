let Booking = require('../../models/Booking')
let Marker = require('../../models/Marker')
let User = require('../../models/User')

module.exports = (app) => {

    app.post('/api/booking/new', (req, res) => {
        const {
            user_id,
            driver_id,
            marker_id
        } = req.body;

        const booking = new Booking({
            userId: user_id,
            driverId: driver_id,
            markerId: marker_id
        });

        booking.save(function (err) {
            if (err) return handleError(err);

            res.send({
                success: true,
                message: 'Booking added!'
            })
        });
    })

    app.post('/api/booking/user', (req, res) => {
        const {
            userId
        } = req.body

        Booking.find({
            'userId': userId
        }, function (err, bookings) {

            // add marker data for each booking
            let all_bookings = bookings.map(async function (booking) {
                // fetch marker
                const marker = await Marker.findOne({'_id': booking.markerId},
                    function (err, obj) {
                        return obj
                    });

                // fetch driver
                const driver = await User.findOne({'_id': booking.driverId},
                    function (err, obj) {
                        return obj
                    });

                // attached data to booking
                let new_booking = booking.toJSON();
                new_booking.marker = marker;
                new_booking.driver = driver;

                return new_booking
            });

            // return all
            Promise.all(all_bookings).then(results => {
                return res.json(results)
            });
        })
    })

}