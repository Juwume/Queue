const Router = require('express')
const queueController = require('../controllers/queueController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()

router.get('/', queueController.getUsers)
router.post('/addToQ',authMiddleware, queueController.addToQueue)
router.post('/leave',authMiddleware, queueController.leaveQueue)
router.post('/create',authMiddleware, queueController.createQueue)
router.post('/delete',authMiddleware, queueController.deleteQueue)
router.get('/searchById',queueController.searchById)
router.get('/searchByName',queueController.searchByName)

module.exports = router