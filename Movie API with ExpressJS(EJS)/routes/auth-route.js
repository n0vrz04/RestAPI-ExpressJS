const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth-controller')

router.post('/verifyUser', authController.loginUser)

module.exports = router