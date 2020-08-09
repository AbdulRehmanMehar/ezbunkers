const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountSchema = new Schema({
    uid: String,
    type: String, // can be shipping, bunkering or admin
    name: String,
    email: String,
    password: String,
    phone: String,
    imo: String,
    companyName: String,
    companyAddress: String,
    companyCountry: String,
    workTitle: String,
    companyDescription: String,
    vessels: [{
        type: Schema.Types.ObjectId,
        ref: 'Vessel'
    }],
    companyImages: [{
        type: Schema.Types.ObjectId,
        ref: 'File'
    }],
    companyDocuments: [{
        type: Schema.Types.ObjectId,
        ref: 'File'
    }],
    otp: {
        type: Schema.Types.ObjectId,
        ref: 'OTP'
    }
})

module.exports = mongoose.model('Account', AccountSchema)