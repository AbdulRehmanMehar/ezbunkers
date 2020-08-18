const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NominationSchema = new Schema({
    sellerId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    buyerId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    buyerEmail: String,
    fuelType: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Fuel'
        }
    ],
    fuelQuantity: Number,
    vesselId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vessel'
    },
    vesselSize: Number,
    price: Number,
    destination: String,
})

module.exports = mongoose.model('Nomination', NominationSchema)