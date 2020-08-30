const router = require('express').Router()
const AdminRouter = require('./admin')
const VesselRouter = require('./vessel')
const FuelModel = require('../models/fuel')
const NominationRouter = require('./nomination')
const AuthenticationRouter = require('./authentication')


router.use('/admin', AdminRouter)
router.use('/vessel', VesselRouter)
router.use('/nomination', NominationRouter)
router.use('/authentication', AuthenticationRouter)


router.get('/fuels',
async (req, res) => {
    try {
        let fuels = await FuelModel.find()

        return res.status(200).json({
            data: {
                fuels
            }
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})


router.get('/accounts',
async (req, res) => {
    try {
        let accounts = await AccountModel.find()

        return res.status(200).json({
            data: {
                accounts
            }
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})
module.exports = router