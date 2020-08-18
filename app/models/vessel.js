const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VesselSchema = new Schema({
    name: String,
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
    },
    fuel: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Fuel'
        }
    ],
})

module.exports = mongoose.model('Vessel', VesselSchema)