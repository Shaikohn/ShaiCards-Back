const Card = require("../models/card")
const UnconfirmedCard = require("../models/unconfirmedCard")
const User = require("../models/user")

const getCards = async(req, res, next) => {
    try {
        let allCards = await Card.find({})
        res.status(200).json(allCards)
    }
    catch(error) {
        next(error)
    }
}

const addLike = async (req, res, next) => {
    const { _id } = req.params

    try {
            const card = await Card.findById(_id)
            card.likes++
            card.save() 
            res.status(200).json(card)
        }
    catch (error) {
        next(error)
    }
} 

const addDislike = async (req, res, next) => {
    const { _id } = req.params

    try {
            const card = await Card.findById(_id)
            card.dislikes++
            card.save()
            res.status(200).json(card)
        }
    catch (error) {
        next(error)
    }
} 

const postCard = async(req, res) => {
    try {
        const { text, type, user, _id, userId } = req.body
        const existingCard = await Card.findOne({text})
        if(existingCard) return res.status(400).json({message: "Esta carta ya existe!"})
        const card = new Card ({
            text,
            type,
            user,
            userId,
            likes: 0,
            dislikes: 0,
        })
        card.save()
        let unconfirmedCard = await UnconfirmedCard.findOne({_id})
        await unconfirmedCard.remove()
        const userDb = await User.findOne({name: user})
        userDb.cards = userDb.cards.concat(card._id)
        userDb.save()
        res.status(200).json(card)
    } catch (error) {
        console.log(error)
    }
}

const postAdminCard = async(req, res) => {
    try {
        const { text, type } = req.body
        if(type.length < 1) return res.status(400).json({message: "Elige una sección!"})
        if(text.length < 4) return res.status(400).json({message: "Debe tener un mínimo de 4 caracteres!"})
        if(text.length > 200) return res.status(400).json({message: "Debe tener un máximo de 200 caracteres!"})
        const existingCard = await Card.findOne({text})
        if(existingCard) return res.status(400).json({message: "Esta carta ya existe!"})
        const card = new Card ({
            text,
            type,
            likes: 0,
            dislikes: 0,
        })
        card.save()
        res.status(200).json(card)
    } catch (error) {
        console.log(error)
    }
}

const removeCard = async (req, res, next) => {
    try {
        const { _id } = req.params
        let card = await Card.findOne({_id})
        await card.remove()
        res.status(200).send({message: "Carta eliminada!"})
    }
    catch(error) {
        next(error)
    }
}

const removeUserCard = async (req, res, next) => {
    try {
        const { _id, user } = req.params
        let card = await Card.findOne({_id})
        const userDb = await User.findOne({name: user})
        const cardId = card._id.toString()
        userDb.cards = userDb.cards.filter((u) => u._id.toString() !== cardId)
        await card.remove()
        userDb.save()
        res.status(200).send({message: "Carta eliminada!"})
    }
    catch(error) {
        next(error)
    }
}

module.exports = {
    getCards,
    postCard,
    postAdminCard,
    removeCard,
    removeUserCard,
    addLike,
    addDislike
}