const Router = require('express')
const router = new Router()
const findQController = require('../controllers/findQController')

router.get('/byId',findQController.searchById)
router.get('/byName',findQController.searchByName)

module.exports = router