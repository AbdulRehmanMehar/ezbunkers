const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NominationSchema = new Schema({
    sellerId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        autopopulate: true
    },
    buyerId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        autopopulate: true
    },
    buyerEmail: String,
    fuelType: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Fuel',
            autopopulate: true
        }
    ],
    fuelQuantity: Number,
    vesselId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vessel',
        autopopulate: true
    },
    vesselSize: Number,
    price: Number,
    destination: String,
})

NominationSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Nomination', NominationSchema)