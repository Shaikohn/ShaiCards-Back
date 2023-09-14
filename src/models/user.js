const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true },
    admin: { type: Boolean, default: false },
    cards: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
        }
    ],
})
module.exports = mongoose.model('User', userSchema)