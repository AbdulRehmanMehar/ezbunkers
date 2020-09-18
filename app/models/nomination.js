const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NominationSchema = new Schema({
    nominator: {
        type:  Schema.Types.ObjectId,
        ref: 'Account',
        autopopulate: true
    },
    fuels: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'NominationFuelQuantity',
            autopopulate: true
        }
    ],
    vessel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vessel',
        autopopulate: true
    },
    vesselSize: Number,
    price: Number,
    destination: String,
}, { timestamps: true })

NominationSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Nomination', NominationSchema)