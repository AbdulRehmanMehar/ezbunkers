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
    vessels: [mongoose.Schema.Types.ObjectId],
    companyImages: [mongoose.Schema.Types.ObjectId],
    companyDocuments: [mongoose.Schema.Types.ObjectId],
})

module.exports = mongoose.model('Account', AccountSchema)