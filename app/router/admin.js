const { v4: uuidv4 } = require('uuid')
const router = require('express').Router()
const sendMail = require('../config/mails')
const FuelModel = require('../models/fuel')
const AccountModel = require('../models/account')
const adminMiddleware = require('../middlewares/admin')
const { check, validationResult } = require('express-validator')
const AccountActivationEmail = require('../config/mails/templates/account-activation')


router.use(adminMiddleware)


router.patch('/activate-account/:id',
async (req, res) => {
    try {
        let theUID = uuidv4().toString().replace('-', '')
        let account = await AccountModel.findByIdAndUpdate(req.params.id, { uid: theUID })
        await sendMail(
            account.email,
            'Your account has been activated by the Admin!',
            AccountActivationEmail(theUID)
        )

        return res.status(200).json({
            data: {
                uid: theUID
            }
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})


router.post('/fuel',
[
    check('name').notEmpty().withMessage('Fuel Name is required'),
],
async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }

    try {
        let fuel = await FuelModel({
            name: req.body.name,
            description: req.body.description
        }).save()

        return res.status(201).json({
            data: {
                fuel
            }
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})


router.delete('/fuel/:id',
async (req, res) => {
    try {
        await FuelModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            message: 'Success'
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

module.exports = router