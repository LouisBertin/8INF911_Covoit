let Marker = require('../../models/Marker')

module.exports = (app) => {

    app.get('/api/markers', (req, res) => {
        Marker.find({}, function(err, markers) {
            res.json(markers)
        });
    })

    app.post('/api/markers/add', (req, res, next) => {

        const {body} = req;
        const {
            lat,
            lng,
        } = body;

        // TODO: express validator ?
        if (!lat || !lng) {
            return res.send({
                success: false,
                message: 'Error: One field is empty'
            })
        }

        let marker = new Marker({
            lng: lng,
            lat: lat
        });
        marker.save();

        return res.send({
            success: true,
            message: 'Congratulations'
        })

    });


}