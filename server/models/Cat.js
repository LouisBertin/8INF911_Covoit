const mongoose = require('mongoose');

const CatSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Cat', CatSchema);
