let Marker = require('../../models/Marker')
let UserSession = require('../../models/UserSession')
let User = require('../../models/User')

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

}