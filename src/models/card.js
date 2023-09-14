const mongoose = require('mongoose')

const cardSchema = mongoose.Schema({
    text: { type: String },
    type: { type: String },
    likes: {type: Number},
    dislikes: {type: Number},
    user: { type: String },
})
module.exports = mongoose.model('Card', cardSchema)