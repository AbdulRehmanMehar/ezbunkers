const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountSchema = new Schema({
    uid: String,
    type: String, // can be shipping, bunkering
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
        ref: 'Vessel',
        autopopulate: true
    }],
    companyImages: [{
        type: Schema.Types.ObjectId,
        ref: 'File',
        autopopulate: true
    }],
    companyDocuments: [{
        type: Schema.Types.ObjectId,
        ref: 'File',
        autopopulate: true
    }],

    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
        autopopulate: true
    }],


    otp: {
        type: Schema.Types.ObjectId,
        ref: 'OTP',
        autopopulate: true
    }
})


AccountSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Account', AccountSchema)