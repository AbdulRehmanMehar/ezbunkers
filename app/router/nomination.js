const router = require('express').Router()
const FuelModel = require('../models/fuel')
const VesselModel = require('../models/vessel')
const AccountModel = require('../models/account')
const NominationModel = require('../models/nomination')
const { check, validationResult } = require('express-validator')
const authenticatedMiddleware = require('../middlewares/authenticated')

router.use(authenticatedMiddleware)


router.get('/',
[
    check('sellerId').custom(async (value) => {
        let seller = await AccountModel.findById(value)

        if (seller) {
            return true
        }
        throw new Error('Invalid Seller Id')
    }),
    check('buyerEmail').isEmail().withMessage('Provide a valid email'),
    check('fuelType').custom(async (value) => {
        let flag = false
        for (val in value) {
            let fuel = await FuelModel.findById(val)

            if (fuel) {
                flag = true
            } else {
                flag = false
                break
            }
        }

        if (flag) {
            return true
        }

        throw new Error('Something went wrong with Fuel Type')
    }),

    check('fuelQuantity').isNumeric().withMessage('Enter valid Fuel Quantity'),
    check('vesselId').custom(async (value) => {
        let vessel = await VesselModel.findById(value)

        if (vessel) {
            return true
        }

        throw new Error('Something went wrong with Vessel')
    }),
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

        let nomination = await NominationModel({
            sellerId: req.body.sellerId,
            buyerId: req.account._id,
            buyerEmail: req.body.buyerEmail,
            fuelType: req.body.fuelType,
            fuelQuantity: req.body.fuelQuantity,
            vesselId: req.body.vesselId,
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