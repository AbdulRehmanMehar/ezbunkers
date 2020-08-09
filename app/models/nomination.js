const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NominationSchema = new Schema({
    sellerId: mongoose.Schema.Types.ObjectId,
    buyerId: mongoose.Schema.Types.ObjectId,
    fuelType: [mongoose.Schema.Types.ObjectId],
    fuelQuantity: Number,
    vesselId: mongoose.Schema.Types.ObjectId,
    vesselSize: Number,
    price: Number,
    destination: String,
})

module.exports = mongoose.model('Nomination', NominationSchema)