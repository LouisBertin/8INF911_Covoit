const mongoose = require('mongoose');

const MarkerSchema = new mongoose.Schema({
    lng: Number,
    lat: Number,
    userId: String,
    latLngEnd: Object,
    placeStart: Object,
    placeEnd: Object,
    departureDate: Date,
    totalSeats: Number,
    currentSeats: {
        Types: Number,
        default: 0
    }
}, {
    timestamps: { createdAt: true}
});

module.exports = mongoose.model('Marker', MarkerSchema);
