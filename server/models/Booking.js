const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    userId: String,
    driverId: String,
    markerId: String
});

module.exports = mongoose.model('Booking', BookingSchema);
