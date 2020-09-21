const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatSchema = new Schema({
    message: String,
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        autopopulate: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        autopopulate: true
    },

    date: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true })

ChatSchema.plugin(require('mongoose-autopopulate'))


module.exports = mongoose.model('Chat', ChatSchema)