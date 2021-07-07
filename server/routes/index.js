const Router = require('express')
const router = new Router()
const findQRouter = require('./findQRouter')
const myQsRouter = require('./myQsRouter')
const queueRouter = require('./queueRouter')
const userRouter = require('./userRouter')
const aboutRouter = require('./aboutRouter')
const createQRouter = require('./createQRouter')

router.use('/user', userRouter)
router.use('/queue', queueRouter)
router.use('/myQs', myQsRouter)
router.use('/findQ', findQRouter)
router.use('/about', aboutRouter)
router.use('/create', createQRouter)

module.exports = router