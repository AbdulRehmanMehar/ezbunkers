const fs = require('fs')
const path = require('path')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const router = require('express').Router()
const FileModel = require('../models/file')
const FuelModel = require('../models/fuel')
const VesselModel = require('../models/vessel')
const AccountModel = require('../models/account')
const multerConf = require('../helpers/multerConf')
const { check, validationResult } = require('express-validator')
const authenticatedMiddleware = require('../middlewares/authenticated')

router.use(authenticatedMiddleware)


router.post('/',
multer(multerConf).fields([{ name: 'image' }]),
[
    check('name').trim().escape().notEmpty().withMessage('Enter the name'),
    check('fuel').custom(async (value) => {
        console.log(value)
        let checkPoint = true

        let fuels = value.split(',')

        for (let val of fuels) {
            let fuel = await FuelModel.findById(val)
            if (fuel == null || fuel == undefined) {
                checkPoint = false
                break
            }
        }


        if (checkPoint) {
            return true
        }

        throw new Error('Invalid Fuel Type has been selected')
    })
],
async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }

    try {
        let image
        for (doc of req.files.image) {
            let pooDoc = await new FileModel({
                type: 'image',
                path: doc.destination + '/' + doc.filename,
                ext: doc.originalname.split('.').pop()
            }).save()
            image = pooDoc
        }

        let fuels = []
        let fIds = req.body.fuel.split(',')
        for (let _id of fIds) {
            let fuel = await FuelModel.findById(_id)
            fuels.push(fuel)
        }

        let acc = await AccountModel.findOne({ email: req.account.email })

        let vessel = await VesselModel({
            name: req.body.name,
            image: image,
            fuel: fuels,
            owner: acc
        }).save()

        await AccountModel.findOneAndUpdate({email: req.account.email}, { $push: { vessels: vessel } })

        return res.status(201).json({
            data: {
                vessel
            }
        })

    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})


router.delete('/:id',
async (req, res) => {
    try {

        let vessel = await VesselModel.findById(req.params.id)
        let image = vessel.image.path
        await AccountModel.findOneAndUpdate({email: req.account.email}, { $pull: { vessels: req.params.id } })
        await VesselModel.findOneAndDelete(req.params.id)

        fs.unlinkSync(path.dirname(require.main.filename) + '/' + image)

        console.log(path.dirname(require.main.filename) + '/' + image)

        return res.status(200).json({
            message: 'Done!'
        })

    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})


router.get('/mine',
    async (req, res) => {
        try {
            let account = await AccountModel.findOne({ _id: req.account._id })

            return res.status(200).json({
                data: {
                    vessels: account.vessels
                }
            })
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    })



module.exports = router