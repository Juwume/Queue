const Router = require('express')
const createQ = require('../controllers/createQController')
const router = new Router()

router.post('/', createQ.create)

module.exports = router