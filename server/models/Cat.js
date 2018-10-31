const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Cat', CounterSchema);
