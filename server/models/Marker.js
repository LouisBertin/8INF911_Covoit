const mongoose = require('mongoose');

const MarkerSchema = new mongoose.Schema({
    lng: Number,
    lat: Number,
    userId: String,
    latLngEnd: Object
});

module.exports = mongoose.model('Marker', MarkerSchema);
