const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const router = require('express').Router()
const FileModel = require('../models/file')
const FuelModel = require('../models/fuel')
const VesselModel = require('../models/vessel')
const { check, validationResult } = require('express-validator')
const authenticatedMiddleware = require('../middlewares/authenticated')

router.use(authenticatedMiddleware)


router.post('/',
[
    check('name').trim().escape().notEmpty().withMessage('Enter the name'),
    check('image').custom((value, {req}) => {
        if (req.files.image) {
            return true
        }
        throw new Error('Select Image')
    }),
    check('fuel').custom(async (value) => {
        let fuel = await FuelModel.findById(value)

        if (fuel) {
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
        let upload = req.files[0]
        let image_name = uuidv4() + '-' + upload.filename
        let target_path = `${__dirname}/uploads/pors/` + image_name
        fs.renameSync(upload.path, target_path)

        let image =  await FileModel({
            type: 'image',
            name: image_name,
            ext: (path.extname(upload.filename)).toLowerCase()
        }).save()

        let vessel = await VesselModel({
            name: req.body.name,
            image: image._id,
            fuel: req.body.fuel
        }).save()

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
        await VesselModel.findOneAndDelete(req.params.id)

        return res.status(200)

    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})


module.exports = router