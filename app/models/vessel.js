const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VesselSchema = new Schema({
    name: String,
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
        autopopulate: true
    },
    fuel: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Fuel',
            autopopulate: true
        }
    ],
})

VesselSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Vessel', VesselSchema)