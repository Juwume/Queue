const Router = require('express')
const queueController = require('../controllers/queueController')
const router = new Router()

router.get('/', queueController.getUsers)
router.post('/addToQ', queueController.addToQueue)
router.post('/leave', queueController.leaveQueue)
router.get('/searchById',queueController.searchById)
router.get('/searchByName',queueController.searchByName)

module.exports = router