require('dotenv').config()
const fs = require('fs')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const OTPModel = require('../models/otp')
const router = require('express').Router()
const FileModel = require('../models/file')
const generateOTP = require('../config/otp')
const AdminModel = require('../models/admin')
const AccountModel = require('../models/account')
const { check, validationResult } = require('express-validator')
const authenticatedMiddleware = require('../middlewares/authenticated')


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

    check('password').custom((value, { req }) => {
        if (req.account.password) {
            if (bcrypt.compareSync(value, req.account.password)) {
                return true
            }
            throw new Error('Password is incorrect.')
        } else {
            let otp = req.body.otp

            if (otp) {
                if (req.account.otp.code == otp) {
                    return true
                } else {
                    throw new Error('OTP is not valid.')
                }
            }
            throw new Error('Please enter the password.')
        }
    })
],
(req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }

    let account = req.account

    delete account.password

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
                let theOTP = await OTPModel({
                    code: generateOTP(),
                    account: account._id
                }).save()

                await AccountModel.findByIdAndUpdate(account._id, {otp: theOTP._id})

                status = 201
            }


        }

        return res.status(status)

    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})


router.post('/register',
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
    check('companyName').trim().escape().notEmpty().withMessage('Enter company name'),
    check('companyAddress').trim().escape().notEmpty().withMessage('Enter company address'),
    check('workTitle').trim().escape().notEmpty().withMessage('Enter work title'),
    check('por').custom((value, { req }) => {
        if (req.files.por && req.files.por.length > 0) {
            return true
        }
        throw new Error('Select documents for proof of Registry')
    }),
    check('poo').custom((value, { req }) => {
        if (req.files.poo && req.files.poo.length > 0) {
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
        let por = req.files.por, poo = req.files.poo
        let por_objIds = [], poo_objIds = []

        for (const doc of por) {
            let temp_path = doc.path
            let fname = uuidv4() + '-' + doc.filename
            let target_path = `${__dirname}/uploads/pors/` + fname
            fs.renameSync(temp_path, target_path)
            let file = await FileModel({
                type: 'por',
                path: `pors/${fname}`,
                ext: (path.extname(doc.filename)).toLowerCase()
            }).save()

            por_objIds.push(file._id)
        }

        for (const doc of poo) {
            let temp_path = doc.path
            let fname = uuidv4() + '-' + doc.filename
            let target_path = `${__dirname}/uploads/poo/` + fname
            fs.renameSync(temp_path, target_path)
            let file = await FileModel({
                type: 'poo',
                path: `poo/${fname}`,
                ext: (path.extname(doc.filename)).toLowerCase()
            }).save()

            poo_objIds.push(file._id)
        }

        let account = await AccountModel({
            type: req.body.role,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            imo: req.body.imo,
            companyName: req.body.companyName,
            companyAddress: req.body.companyAddress,
            workTitle: req.body.workTitle,
            companyDocuments: [...por_objIds, ...poo_objIds]
        }).save()

        return res.status(201)


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
        await OTPModel.findOneAndDelete({ account: req.account._id })
        await AccountModel.findByIdAndUpdate(req.account._id, {
            password: bcrypt.hashSync(req.body.password),
            otp: null
        })

        return res.status(200)
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
            if (bcrypt.compareSync(value, req.admin.password)) {
                return true
            }
            throw new Error('Password is not valid')
        })
],
(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }

    let admin = req.admin

    delete admin.password

    const token = jwt.sign(admin, process.env.APP_SECRET)
    admin.token = token

    return res.status(200).json({
        data: {
            admin
        }
    })

})


module.exports = router