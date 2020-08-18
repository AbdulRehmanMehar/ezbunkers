const router = require('express').Router()
const AdminRouter = require('./admin')
const VesselRouter = require('./vessel')
const NominationRouter = require('./nomination')
const AuthenticationRouter = require('./authentication')


router.use('/admin', AdminRouter)
router.use('/vessel', VesselRouter)
router.use('/nomination', NominationRouter)
router.use('/authentication', AuthenticationRouter)


module.exports = router