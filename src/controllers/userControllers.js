const User = require('../models/user')
const dotenv = require("dotenv");
dotenv.config();

const getUser = async(req, res) => {
    const { _id } = req.params
    try {
        const user = await User.findOne({_id})
        res.status(200).json(user)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went wrong.'})
    }
}

module.exports = {
    getUser,
}