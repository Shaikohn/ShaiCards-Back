const express = require('express')
const { getUsers, getUser, googleUser, updateUserNickName } = require('../controllers/userControllers')

const router = express.Router()

router.get('/user/:_id', getUser)
router.get('/users/all', getUsers)
router.post('/googleUser', googleUser)
router.patch('/editUserNickName/:_id', updateUserNickName)

module.exports = router 