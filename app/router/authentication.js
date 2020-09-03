require('dotenv').config()
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const OTPModel = require('../models/otp')
const mailer = require('../config/mails')
const router = require('express').Router()
const FileModel = require('../models/file')
const generateOTP = require('../config/otp')
const AdminModel = require('../models/admin')
const AccountModel = require('../models/account')
const multerConf = require('../helpers/multerConf')
const { check, validationResult } = require('express-validator')
const OneTimePasswordMail = require('../config/mails/templates/otp')
const authenticatedMiddleware = require('../middlewares/authenticated')
const accountRegistrationMail = require('../config/mails/templates/account-registration')


router.post('/login',
[
    check('uid').notEmpty().withMessage('Please enter user id (received via email).')
        .custom(async (value, {req}) => {
            let account = await AccountModel.findOne({ uid: req.body.uid })
            if (account && account._id.toString()) {
                req.account = account
                return true
            }
            throw new Error('No such user was found.')
        }),

    check('password').custom(async (value, { req }) => {
        let account = await AccountModel.findOne({ uid: req.body.uid })
        if (account.password) {
            if (bcrypt.compareSync(value, account.password)) {
                return true
            }
            throw new Error('Password is incorrect.')
        } else {
            let otp = req.body.otp

            if (otp) {
                if (account.otp.code == otp) {
                    return true
                } else {
                    throw new Error('OTP is not valid.')
                }
            }
            throw new Error('Please enter the password.')
        }
    })
],
async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }




    let account = await AccountModel.findOne({ uid: req.body.uid })
    if (account.otp && account.otp._id) {
        await OTPModel.findByIdAndDelete(account.otp._id)
        await AccountModel.findOneAndUpdate({uid: req.body.uid}, {$unset: {otp: account.otp._id}})
    }


    account = account.toObject()
    delete account.password
    delete account._id
    delete account._v

    const token = jwt.sign(account, process.env.APP_SECRET)
    account.token = token

    return res.status(200).json({
        data: {
            account
        }
    })

})


router.get('/see-exists-and-set-otp/:uid',
async (req, res) => {
    try {
        let status = 204
        let account = await AccountModel.findOne({ uid: req.params.uid })

        if (account) {
            status = 200

            if (!account.password) {
                let otpCode = generateOTP()
                let theOTP = await OTPModel({
                    code: otpCode,
                    account: account
                }).save()


                await mailer(account.email, 'Use it to Login', OneTimePasswordMail(account.name, otpCode))
                await AccountModel.findByIdAndUpdate(account._id, {otp: theOTP})

                status = 201
            }


        }

        return res.status(status).json({
            message: 'Done!'
        })

    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})


router.post('/register',
multer(multerConf).fields([{ name: 'poo' }, { name: 'por' }]),
[
    check('name').trim().escape().notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Enter a valid email')
        .custom(async (value) => {
            let account = await AccountModel.findOne({ email: value })
            if (account) {
                throw new Error('Email already registered')
            }
            return true
        }),

    check('role').trim().escape().custom(value => {
        let lower = value.toString().toLowerCase()
        if (lower === 'shipping' || lower == 'bunkering') {
            return true
        }

        throw new Error('Invalid Role is Selected')
    }),
    check('phone').isMobilePhone().withMessage('Enter a valid phone number'),
    check('imo').isMobilePhone().withMessage('Enter a valid imo number'),
    check('country').notEmpty().withMessage('Enter your country'),
    check('companyName').trim().escape().notEmpty().withMessage('Enter company name'),
    check('companyAddress').trim().escape().notEmpty().withMessage('Enter company address'),
    check('companyDescription').trim().escape().notEmpty().withMessage('Enter company description'),
    check('workTitle').trim().escape().notEmpty().withMessage('Enter work title'),
    check('por').custom((value, { req }) => {
        if (req.files && req.files.por) {
            return true
        }
        throw new Error('Select documents for proof of Registry')
    }),
    check('poo').custom((value, { req }) => {
        if (req.files && req.files.poo) {
            return true
        }
        throw new Error('Select documents for proof of Ownership')
    }),

],
async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }

    try {
        let pooDocs = [], porDocs = []
        for (doc of req.files.poo) {
            let pooDoc = await new FileModel({
                type: 'poo',
                path: doc.destination + '/' + doc.filename,
                ext: doc.originalname.split('.').pop()
            }).save()
            pooDocs.push(pooDoc)
        }

        for (doc of req.files.por) {
            let porDoc = await new FileModel({
                type: 'por',
                path: doc.destination + '/' + doc.filename,
                ext: doc.originalname.split('.').pop()
            }).save()
            porDocs.push(porDoc)
        }

        let companyDocs = [...pooDocs, ...porDocs]

        console.log(companyDocs)

        let account = await new AccountModel({
            type: req.body.role,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            imo: req.body.imo,
            companyCountry: req.body.country,
            companyName: req.body.companyName,
            companyDescription: req.body.companyDescription,
            companyAddress: req.body.companyAddress,
            workTitle: req.body.workTitle,
            companyDocuments: companyDocs
        }).save()

        await mailer(req.body.email, 'You\'re Signed Up!', accountRegistrationMail())

        return res.status(201).json({
            message: 'Success'
        })


    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})


router.patch('/set-password',
authenticatedMiddleware,
[
    check('password').notEmpty().withMessage('Password is required').custom((value, {req}) => {
        if (value == req.body.confirmPassword) {
            return true
        }
        throw new Error('Passwords don\'t match')
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
        await AccountModel.findOneAndUpdate({ uid: req.account.uid }, {
            password: bcrypt.hashSync(req.body.password)
        })

        return res.status(200).json({
            message: 'Done!'
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})


router.post('/admin-login',
[
    check('username').notEmpty().withMessage('Please provide username')
        .custom(async (value, {req}) => {
            let admin = await AdminModel.findOne({ username: value })
            if (admin) {
                req.admin = admin
                return true
            }
            throw new Error('Username is not in record')
        }),
    check('password').notEmpty().withMessage('Please provide password')
        .custom(async (value, {req}) => {
            let admin = await AdminModel.findOne({ username: req.body.username })
            if (bcrypt.compareSync(value, admin.password)) {
                return true
            }
            throw new Error('Password is not valid')
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

        let admin = await AdminModel.findOne({ username: req.body.username })
        admin = admin.toObject()
        delete admin.password
        delete admin._v
        delete admin._id

        admin.type = 'admin'
        const token = jwt.sign(admin, process.env.APP_SECRET)
        admin.token = token


        return res.status(200).json({
            data: {
                admin
            }
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }

})


router.post('/add-documents',
authenticatedMiddleware,
multer(multerConf).fields([{ name: 'documents' }]),
[
    check('fileType').notEmpty().withMessage('Sorry, You must choose document type.')
],
async (req, res) => {

    try{
        let documents = []
        for (doc of req.files.documents) {
            let pooDoc = await new FileModel({
                type: req.body.fileType,
                path: doc.destination + '/' + doc.filename,
                ext: doc.originalname.split('.').pop()
            }).save()
            documents.push(pooDoc)
        }

        await AccountModel.findOneAndUpdate({email: req.account.email}, { $push: { companyDocuments: documents } })

        return res.status(200).json({
            data: {
                documents
            }
        })
    }catch (error) {
        return res.status(500).json({
            error
        })
    }

})

router.delete('/document/:id',
authenticatedMiddleware,
async (req, res) => {
    try {

        let document = await FileModel.findById(req.params.id)
        let image = document.path

        await AccountModel.findOneAndUpdate({email: req.account.email}, { $pull: { companyDocuments: req.params.id } })
        await FileModel.findOneAndDelete(req.params.id)

        fs.unlinkSync(path.dirname(require.main.filename) + '/' + image)

        return res.status(200).json({
            message: 'Done!'
        })

    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})



router.post('/add-images',
authenticatedMiddleware,
multer(multerConf).fields([{ name: 'logo', length: 1 }, { name: 'banner' }]),
[
    check('fileType').notEmpty().withMessage('Sorry, You must choose image type.')
],
async (req, res) => {

        try{
            if (req.files) {
                let images = []

                if (req.files.logo) {
                    let logo = await new FileModel({
                        type: 'logo',
                        path: req.files.logo[0].destination + '/' + req.files.logo[0].filename,
                        ext: req.files.logo[0].originalname.split('.').pop()
                    }).save()

                    images.push(logo)
                }

                if (req.files.banner) {
                    for (doc of req.files.banner) {
                        let banner = await new FileModel({
                            type: 'banner',
                            path: doc.destination + '/' + doc.filename,
                            ext: doc.originalname.split('.').pop()
                        }).save()
                        images.push(banner)
                    }
                }

                await AccountModel.findOneAndUpdate({email: req.account.email}, {$push: {companyImages: images}})

                return res.status(200).json({
                    data: {
                        images
                    }
                })
            }
            return res.status(204).json({
                message: 'Nothing changed!'
            })
        }catch (error) {
            return res.status(500).json({
                error
            })
        }

    })


router.delete('/image/:id',
authenticatedMiddleware,
async (req, res) => {
    try {

        let document = await FileModel.findById(req.params.id)
        let image = document.path

        await AccountModel.findOneAndUpdate({email: req.account.email}, { $pull: { companyImages: req.params.id } })
        await FileModel.findOneAndDelete(req.params.id)

        fs.unlinkSync(path.dirname(require.main.filename) + '/' + image)

        return res.status(200).json({
            message: 'Done!'
        })

    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})


module.exports = router