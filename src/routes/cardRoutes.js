const express = require('express')
const { getCards, postCard, postAdminCard, removeCard } = require('../controllers/cardControllers')

const router = express.Router()

router.get('/all', getCards)
router.post('/addCard', postCard)
router.post('/addCardByAdmin', postAdminCard)
router.delete('/:_id', removeCard)

module.exports = router 