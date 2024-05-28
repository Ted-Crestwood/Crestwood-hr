const express = require('express')
const { updateOrganisation, deleteOrganisation } = require('../controllers/organisation.controller')
const router = express.Router()


router.put('/:id', updateOrganisation)
router.delete('/:id', deleteOrganisation)
module.exports = router