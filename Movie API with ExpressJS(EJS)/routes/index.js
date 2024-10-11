const express = require('express')
const router = express.Router()
const defaultRouter = require('./default-route')
const movieRouter = require('./movie-route')
const loginRouter = require('./login-route')
const authRouter = require('./auth-route')
const userRouter = require('./user-route')

router.use('/',defaultRouter)
router.use('/movies', movieRouter)
router.use('/', loginRouter)
router.use('/', authRouter)
router.use('/users', userRouter)

module.exports = router