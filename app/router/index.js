const router = require('express').Router()
const AuthenticationRouter = require('./authentication')


router.use('/authentication', AuthenticationRouter)


module.exports = router