const express = require('express')
const mongoose = require('mongoose');
const config = require('../config/config')
// db connection
mongoose.connect(config.db, { useNewUrlParser: true } );

// get collections
let Cat = require('./models/Cat')

// express routes
const app = express()
app.get('/test', (req,res) => {
    const kitty = new Cat({ name: 'Zildjan' });
    kitty.save().then(() => console.log('meow'));
})

app.get('/cats', (req, res) => {
    const cats = Cat.find().lean().exec(function (err, cats) {
        res.json(cats)
    })
})

app.get('/api/customers', (req,res) => {
    const customers = [
        {id: 1, firstName: 'John', lastName: 'Doe'},
        {id: 2, firstName: 'Brad', lastName: 'Traversy'},
        {id: 3, firstName: 'Mary', lastName: 'Smith'},
    ]

    res.json(customers)
})

// run server
const port = 5000
app.listen(port, () => console.log('Hello world!'))