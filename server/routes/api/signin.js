let User = require('../../models/User')
let UserSession = require('../../models/UserSession')

module.exports = (app) => {

    app.post('/api/account/signup', (req, res, next) => {

        const { body } = req
        const {
            firstName,
            lastName,
            email,
            password
        } = body;

        if (!firstName) {
            return res.send({
                success: false,
                message: 'Error: First name cannot be blank.'
            })
        }

        User.find({
            email: email
        }, (err, previousUser) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error.'
                })
            } else if (previousUser > 0) {
                return res.send({
                    success: false,
                    message: 'Error: Account already exist.'
                })
            } else {
                const newUser = new User();

                newUser.firstName = firstName;
                newUser.lastName = lastName;
                newUser.email = email;
                newUser.password = newUser.generateHash(password);
                newUser.save((err, user) => {
                    if (err) {
                        return res.send({
                            success: false,
                            message: 'Error: Server error'
                        })
                    }
                    return res.send({
                        success: true,
                        message: 'Sign up'
                    })
                })
            }
        })
    })

    app.post('/api/account/signin', (req, res, next) => {

        const {body} = req
        const {
            email,
            password
        } = body

        if (!password) {
            return res.send({
                success: false,
                message: 'Error: Password cannot be blank.'
            })
        }

        User.find({
            email: email
        }, (error, users) => {
            if (error) {
                res.send({
                    success: false,
                    message: 'Error: Server error'
                })
            }
            if (users.length !== 1) {
                res.send({
                    success: false,
                    message: 'Error: Invalid'
                })
            }

            const user = users[0];
            if (!user.validPassword(password)) {
                res.send({
                    success: false,
                    message: 'Error: Invalid'
                })
            }

            const userSession = new UserSession();
            userSession.userId = user._id;
            userSession.save((error, doc) => {
                if (error) {
                    res.send({
                        success: false,
                        message: 'Error: Server error'
                    })
                }

                res.send({
                    success: true,
                    message: 'Valid sign in',
                    token: doc._id
                })
            })
        })

    })

    app.get('/api/account/verify', (req, res, next) => {

        const { query } = req
        const { token } = query

        UserSession.find({
            _id: token,
            isDelete: false
        }, (error, sessions) => {
            if (error) {
                return res.send({
                    success: false,
                    message: 'Error: Server error.'
                })
            }

            if (sessions.length !== 1) {
                return res.send({
                    success: false,
                    message: 'Invalid'
                })
            } else {
                return res.send({
                    success: true,
                    message: 'Good'
                })
            }
        })

    })

    app.get('/api/account/logout', (req, res, next) => {

        const { query } = req
        const { token } = query

        UserSession.findOneAndUpdate({
            _id: token,
            isDelete: false
        }, {
            $set: {isDelete: true}
        }, null, (error, sessions) => {
            if (error) {
                return res.send({
                    success: false,
                    message: 'Error: Server error.'
                })
            }

            return res.send({
                success: true,
                message: 'Good'
            })
        })

    })

}