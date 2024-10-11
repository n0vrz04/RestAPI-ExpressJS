const express = require('express')
const router = express.Router()
const loginController = require('../controllers/login-controller')

router.get('/login',loginController.getLoginView)

module.exports = router