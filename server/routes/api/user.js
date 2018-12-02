let User = require('../../models/User')
let UserSession = require('../../models/UserSession')

module.exports = (app) => {
    app.get('/api/account/name', (req, res) => {
        const {token} = req.query;
        UserSession.findOne({_id: token}, function (err, user_session) {
            res.json(user_session);
        })
    })
}
