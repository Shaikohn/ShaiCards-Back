const express = require('express')
const { getUnconfirmedCards, postUnconfirmedCard, removeUnconfirmedCard } = require('../controllers/unconfirmedCardControllers')

const router = express.Router()

router.get('/all', getUnconfirmedCards)
router.post('/addUnconfirmedCard', postUnconfirmedCard)
router.delete('/:_id', removeUnconfirmedCard)

module.exports = router 