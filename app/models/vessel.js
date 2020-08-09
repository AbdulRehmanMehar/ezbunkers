const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VesselSchema = new Schema({
    name: String,
    image: mongoose.Schema.Types.ObjectId,
    fuel: [mongoose.Schema.Types.ObjectId],
})

module.exports = mongoose.model('Vessel', VesselSchema)