require('dotenv').config()
const fs = require('fs')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const router = require('express').Router()
const FileModel = require('../models/file')
const AccountModel = require('../models/account')
const { check, validationResult } = require('express-validator')

router.post('/login',
[
    check('uid').notEmpty().withMessage('Please enter user id.')
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


router.post('/register', [
    check('name').trim().escape().notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Enter a valid email')
        .custom(async (value) => {
            let account = await AccountModel.findOne({ email: value })
            if (account) {
                throw new Error('Email already registered')
            }
            return true
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

], async (req, res) => {

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


module.exports = router