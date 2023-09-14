const jwt = require('jsonwebtoken')
const User = require('../models/user')
const dotenv = require("dotenv");
dotenv.config();

const googleUser = async(req, res) => {
    try {
        const { email } = req.body
        const existingUser = await User.findOne({email})
        if(existingUser) {
            const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: '2h'})
            res.status(200).json({result: existingUser, token})
        } else {
            const result = await User.create({email, cards: []})
            const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: '2h'})
            let newUser = "Recién creada"
            res.status(200).json({result: result, token, newUser})
        }
    } catch(e) {
        console.log(e)
    }
}

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

const getUsers = async(req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Algo salió mal.'}) 
    }
}

const updateUserNickName = async (req, res) => {
    const { _id } = req.params
    const { nickName } = req.body

    const existingNickName = await User.findOne({name: nickName})
    if(nickName.length < 3) return res.status(400).json({message: "El mínimo es de 3 caracteres!"})
    if(nickName.length > 20) return res.status(400).json({message: "El máximo es de 20 caracteres!"})
    if(existingNickName) return res.status(400).json({message: "Ese nombre ya existe!"})
    const pattern = new RegExp('^[A-Z]+$', 'i');
    if(!pattern.test(nickName)) return res.status(404).json({message: "Usa solo letras!"})

    try {
        const user = await User.findById(_id)
        await user.updateOne({ 
            name: nickName,
        })
        user.save()
        const userUpdated = await User.findOne({_id})
        return res.status(200).json(userUpdated);
        } catch (error) {
            res.status(400).json(error);
        }
    };

module.exports = {
    googleUser,
    getUser,
    getUsers,
    updateUserNickName,
}