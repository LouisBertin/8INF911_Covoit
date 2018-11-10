let Cat = require('../../models/Cat')

module.exports = (app) => {

    app.get('/api/markers', (req, res) => {
        const markers = [
            {id: 1, lng: -71.057660, lat: 48.412890 },
            {id: 2, lng: -71.073200, lat: 48.422220},
            {id: 3, lng: -71.062980, lat: 48.428940},
        ]

        res.json(markers)
    })

}