const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OTPSchema = new Schema({
    code: Number,
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    }
})

module.exports = mongoose.model('OTP', OTPSchema)