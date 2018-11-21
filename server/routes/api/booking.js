let Booking = require('../../models/Booking')

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

}