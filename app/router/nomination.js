const router = require('express').Router()
const FuelModel = require('../models/fuel')
const VesselModel = require('../models/vessel')
const AccountModel = require('../models/account')
const NominationModel = require('../models/nomination')
const NominationFuelQuantityModel = require('../models/NominationFuelQuantity')
const { check, validationResult } = require('express-validator')
const authenticatedMiddleware = require('../middlewares/authenticated')

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

        console.log(req.body.fuelQuantities)

        let fuel_ids = []

        for (let fuel of req.body.fuelQuantities) {
            let fuelQuantity = await NominationFuelQuantityModel({
                fuel: fuel.id,
                quantity: fuel.quantity
            }).save()

            fuel_ids.push(fuelQuantity)
        }

        let buyer = await AccountModel.find({ email: req.account.email })

        console.log(buyer, fuel_ids)


        let nomination = await NominationModel({
            sellerId: req.body.sellerId,
            buyerId: buyer._id,
            buyerEmail: buyer.buyerEmail,
            vesselId: req.body.vesselId,
            fuels: fuel_ids,
            vesselSize: req.body.vesselSize,
            price: req.body.price,
            destination: req.body.destination
        }).save()

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


module.exports = router