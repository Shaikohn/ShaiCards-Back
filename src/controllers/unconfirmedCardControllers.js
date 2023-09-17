const UnconfirmedCard = require("../models/unconfirmedCard")
const Card = require("../models/card")

const getUnconfirmedCards = async(req, res, next) => {
    try {
        let allUnconfirmedCards = await UnconfirmedCard.find({})
        res.status(200).json(allUnconfirmedCards)
    }
    catch(error) {
        next(error)
    }
}

const postUnconfirmedCard = async(req, res) => {
    try {
        const { text, type, user } = req.body
        
        if(text.length < 4) return res.status(400).json({message: "Debe tener un mínimo de 4 caracteres!"})
        if(text.length > 200) return res.status(400).json({message: "Debe tener un máximo de 200 caracteres!"})
        const existingCard = await Card.findOne({text})
        if(existingCard) return res.status(400).json({message: "Esta carta ya existe!"})
        const unconfirmedCard = new UnconfirmedCard ({
            text,
            type,
            user
        })
        unconfirmedCard.save()
        res.status(200).json(unconfirmedCard)
    } catch (error) {
        console.log(error)
    }
}

const removeUnconfirmedCard = async (req, res, next) => {
    try {
        const { _id } = req.params
        let unconfirmedCard = await UnconfirmedCard.findOne({_id})
        await unconfirmedCard.remove()
        res.status(200).send({message: "Carta eliminada!"})
    }
    catch(error) {
        next(error)
    }
}

module.exports = {
    getUnconfirmedCards,
    postUnconfirmedCard,
    removeUnconfirmedCard
}