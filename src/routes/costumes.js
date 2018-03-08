const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/costumes')

router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getById)
router.post('/', ctrl.create)
router.post('/:id/tags', ctrl.createTag)
router.put('/:id', ctrl.changeDetails)
router.delete('/:id', ctrl.deleteCostume)

module.exports = router
