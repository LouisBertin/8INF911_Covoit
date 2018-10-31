let User = require('../../models/User')

module.exports = (app) => {
    app.post('/api/account/signup', (req, res, next) => {
        const { body } = req
        const {
            firstName,
            lastName,
            email,
            password
        } = body

        if (!firstName) {
            res.end({
                success: false,
                message: 'Error: First name cannot be blank.'
            })
        }

        User.find({
            email: email
        }, (err, previousUser) => {
            if (err) {
                res.end({
                    success: false,
                    message: 'Error: Server Error.'
                })
            } else if (previousUser > 0) {
                res.end({
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
                        res.end({
                            success: false,
                            message: 'Error: Server error'
                        })
                    }
                    res.end({
                        success: true,
                        message: 'Sign up'
                    })
                })
            }
        })
    })
}