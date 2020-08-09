const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FileSchema = new Schema({
    type: String, // can be img, por, poo
    path: String
})

module.exports = mongoose.model('File', FileSchema)