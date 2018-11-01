const express = require('express')
const mongoose = require('mongoose');
const config = require('../config/config')
const port = 5000;

// db connection
mongoose.connect(config.db, { useNewUrlParser: true } );

// express routes
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes')(app);

// run server
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }

    console.info('>>> 🌎 Open http://localhost:%s/ in your browser.', port);
});