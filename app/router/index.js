const router = require('express').Router()
const AdminRouter = require('./admin')
const VesselRouter = require('./vessel')
const mailer = require('../config/mails')
const FuelModel = require('../models/fuel')
const VesselModel = require('../models/vessel')
const NominationRouter = require('./nomination')
const AccountModel = require('../models/account')
const ReviewModel = require('../models/review')
const NominationModel = require('../models/nomination')
const AuthenticationRouter = require('./authentication')
const authenticatedMiddleware = require('../middlewares/authenticated')
const ReviewToOrderVesselOwner = require('../config/mails/templates/you-got-a-review')

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
        let accounts = await AccountModel.find().select("-password")

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


router.get('/vessels',
    async (req, res) => {
        try {
            let vessels = await VesselModel.find()

            return res.status(200).json({
                data: {
                    vessels
                }
            })
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    })


// REVIEWS

router.post('/review',
authenticatedMiddleware,
async (req, res) => {
    try {
        let review = await ReviewModel({
            quality: req.body.quality,
            price: req.body.price,
            communication: req.body.communication,
            review: req.body.review,
            reviewee: req.body.reviewee,
            reviewer: req.account._id
        }).save()

        await NominationModel.findOneAndUpdate({ _id: req.body.nomination }, { review: review })

        await AccountModel.findOneAndUpdate({ _id: review.reviewee._id }, { review: review })

        await mailer(review.reviewee.email, 'You got a Review', ReviewToOrderVesselOwner(review.reviewee.name, review.reviewer.companyName, review._id))

        return res.status(201).json({
            data: {
                review
            }
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})


router.get('/review',
async (req, res) => {
    try {
        let reviews = await ReviewModel.find()

        return res.status(200).json({
            data: {
                reviews
            }
        })

    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

module.exports = router