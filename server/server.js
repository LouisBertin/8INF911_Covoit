const express = require('express')
const mongoose = require('mongoose');
const config = require('../config/config')
// db connection
mongoose.connect(config.db, { useNewUrlParser: true } );

// express routes
const app = express()
require('./routes')(app);

// run server
const port = 5000
app.listen(port, () => console.log('Hello world!'))