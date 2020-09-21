const router = require('express').Router()
const mailer = require('../config/mails')
const FuelModel = require('../models/fuel')
const VesselModel = require('../models/vessel')
const AccountModel = require('../models/account')
const NominationModel = require('../models/nomination')
const NominationFuelQuantityModel = require('../models/NominationFuelQuantity')
const { check, validationResult } = require('express-validator')
const authenticatedMiddleware = require('../middlewares/authenticated')
const OrderNominationToOwner = require('../config/mails/templates/order-nomination-to-owner')
const OrderStatusToNominator = require('../config/mails/templates/order-status-to-nominator')

router.use(authenticatedMiddleware)


router.post('/',
[
    check('sellerId').custom(async (value) => {
        let seller = await AccountModel.findById(value)

        if (seller) {
            return true
        }
        throw new Error('Invalid Seller Id')
    }),

    check('vesselId').custom(async (value) => {
        let vessel = await VesselModel.findById(value)

        if (vessel) {
            return true
        }

        throw new Error('Something went wrong with Vessel')
    }),
    check('fuelQuantities').notEmpty().withMessage('Something is wrong with fuel quantity'),
    check('vesselSize').isNumeric().withMessage('Enter valid Vessel Size'),
    check('price').isNumeric().withMessage('Enter valid price'),
    check('destination').trim().escape().notEmpty().withMessage('Enter valid destination'),
],
async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }

    try {
        let fuel_ids = []

        for (let fuel of req.body.fuelQuantities) {
            let fuelQuantity = await NominationFuelQuantityModel({
                fuel: fuel.id,
                quantity: fuel.quantity
            }).save()

            fuel_ids.push(fuelQuantity)
        }

        let buyer = await AccountModel.findOne({ uid: req.account.uid })


        let nomination = await NominationModel({
            nominator: buyer,
            vessel: req.body.vesselId,
            fuels: fuel_ids,
            vesselSize: req.body.vesselSize,
            price: req.body.price,
            destination: req.body.destination
        }).save()

        await mailer(nomination.vessel.owner.email, 'You got a new Order', OrderNominationToOwner(nomination.vessel.owner.name, nomination._id, nomination.nominator.companyName))

        return res.status(201).json({
            data: {
                nomination
            }
        })

    } catch (error) {
        return res.status(500).json({
            error
        })
    }

})


router.get('/orders',
async (req, res) => {
    try {
        let orders = await NominationModel.find()

        return res.status(200).json({
            data: {
                orders
            }
        })
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
})


router.patch('/',
async (req, res) => {
    try {

        let order = await NominationModel.findById(req.body.id)

        if (order && !order.complete && order.vessel.owner.uid == req.account.uid) {
            let resp = {
                message: 'Nothing Changed!'
            }

            if (req.body.accept && order.status == 'pending') {
                await NominationModel.findOneAndUpdate({_id: req.body.id}, {status: 'accepted'})
                resp = {
                    status: 'accepted'
                }
            } else if (req.body.reject && order.status == 'pending') {
                await NominationModel.findOneAndUpdate({_id: req.body.id}, {status: 'rejected'})
                resp = {
                    status: 'rejected'
                }
            } else if (req.body.complete && order.status == 'accepted') {
                await NominationModel.findOneAndUpdate({_id: req.body.id}, {status: 'completed'})
                resp = {
                    status: 'completed'
                }
            }


            await mailer(order.nominator.email, 'Status Update for your Nomination', OrderStatusToNominator(order.nominator.name, order._id, resp.status, order.vessel.owner.companyName))

            return res.status(200).json({
                data: {
                    resp
                }
            })
        }

        return res.status(204).json({
            message: 'Something isn\'t right'
        })

    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
})

module.exports = router