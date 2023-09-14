const express = require('express')
const { getCards, postCard, postAdminCard, removeCard, removeUserCard } = require('../controllers/cardControllers')

const router = express.Router()

router.get('/all', getCards)
router.post('/addCard', postCard)
router.post('/addCardByAdmin', postAdminCard)
router.delete('/:_id', removeCard)
router.delete('/:user/:_id', removeUserCard)

module.exports = router 