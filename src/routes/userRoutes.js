const express = require('express')
const { getUser } = require('../controllers/userControllers')

const router = express.Router()

router.get('/user/:_id', getUser)

module.exports = router 