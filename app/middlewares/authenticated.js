require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'] // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string, if present
        token = token.slice(7, token.length)
    }

    if (token) {
        jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
            if (err) {
                return res.status(400).json({
                    error: 'Token is not valid or expired'
                })
            } else {
                req.account = decoded
                next()
            }
        })
    } else {
        return res.status(500).json({
            error: 'You are not authorized!'
        })
    }
}