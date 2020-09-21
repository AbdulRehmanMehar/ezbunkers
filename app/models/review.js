const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    quality: Number,
    price: Number,
    communication: Number,
    review: String,
    reviewee: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        autopopulate: true
    },
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        autopopulate: true
    }
})

schema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Review', schema)