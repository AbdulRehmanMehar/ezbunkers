const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatSchema = new Schema({
    message: String,
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
    },

    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Chat', ChatSchema)