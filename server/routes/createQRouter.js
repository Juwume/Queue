const Router = require('express')
const createQ = require('../controllers/createQController')
const router = new Router()

router.get('/')
router.post('/', createQ.create)

module.exports = router