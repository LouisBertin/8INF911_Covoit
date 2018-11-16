let Marker = require('../../models/Marker')
let UserSession = require('../../models/UserSession')
let User = require('../../models/User')
let turf = require('@turf/turf');

module.exports = (app) => {

    app.get('/api/markers', (req, res) => {
        Marker.find({}, function(err, markers) {
            res.json(markers)
        });
    })

    app.get('/api/markers/token', (req, res) => {
        const { token } = req.query;

        // TODO : manage errors
        UserSession.findOne({ _id: token }, function (err, user_session) {
            const user_id = user_session.userId;
                Marker.find({userId: user_id}, function(err, markers) {
                    res.json(markers)
                });
        });
    })

    app.post('/api/markers/add', (req, res, next) => {

        const {body} = req;
        const {
            lat,
            lng,
            token
        } = body;

        // TODO: express validator ?
        if (!lat || !lng) {
            return res.send({
                success: false,
                message: 'Error: One field is empty'
            })
        }

        // find user and insert marker in db
        UserSession.findOne({ _id: token }, function (err, userSession) {
            User.findOne({ _id: userSession.userId }, function (err, user) {
                let marker = new Marker({
                    lng: lng,
                    lat: lat,
                    userId: user._id
                });
                marker.save();
            });
        });

        return res.send({
            success: true,
            message: 'Congratulations'
        })

    });

    app.post('/api/markers/delete', (req, res, next) => {
        const {body} = req;
        const {
            id
        } = body;

        Marker.deleteOne({ _id: id }, function (err) {
            if (err) return handleError(err);

            return res.send({
                success: true,
                message: 'Marker deleted!'
            })
        });
    })

    app.post('/api/markers/bounds', (req, res, next) => {

        const {body} = req;
        const {
            bounds,
            radius
        } = body

        // setup turf params
        const From = turf.point([bounds.lat, bounds.lng]);
        const options = {units: 'kilometers'};

        // retrieve markers
        let markers_in_bounds = [];
        Marker.find({}, function(err, markers) {
            for (const marker of markers) {
                const to = turf.point([marker.lat, marker.lng]);
                const distance = turf.distance(From, to, options) * 1000

                if (distance <= radius) {
                    markers_in_bounds.push(marker)
                }
            }

            res.json(markers_in_bounds)
        });

    })

}