const Router = require('express')
const router = new Router()
const queueRouter = require('./queueRouter')
const userRouter = require('./userRouter')


router.use('/api/user', userRouter)
router.use('/api/queue', queueRouter)




module.exports = router