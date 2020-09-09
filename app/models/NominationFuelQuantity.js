const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    fuel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fuel',
        autopopulate: true
    },

    quantity: Number
})

schema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('NominationFuelQuantity', schema)