const Router = require('express')
const queueController = require('../controllers/queueController')
const router = new Router()

router.get('/', queueController.getUsers)
router.post('/')

module.exports = router