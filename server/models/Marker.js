const mongoose = require('mongoose');

const MarkerSchema = new mongoose.Schema({
    lng: Number,
    lat: Number
});

module.exports = mongoose.model('Marker', MarkerSchema);
