const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/costumes')

router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getById)
router.get('/:id/tags', ctrl.getTags)
router.post('/', ctrl.create)
router.post('/:id/tags', ctrl.createTag)
router.put('/:id', ctrl.changeDetails)
router.put('/:id/tags/:tagid', ctrl.changeTag)
router.delete('/:id', ctrl.deleteCostume)
router.delete('/:id/tags/:tagid', ctrl.deleteTag)

module.exports = router
