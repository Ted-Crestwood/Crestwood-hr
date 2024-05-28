const express = require('express')
const { createOrganisation, getAllOrganisation, getOrganisationById, updateOrganisation, deleteOrganisation } = require('../controllers/organisation.controller')
const router = express.Router()

router.get('/', getAllOrganisation)
router.get('/:id', getOrganisationById)
router.post('/', createOrganisation)
router.put('/:id', updateOrganisation)
router.delete('/:id', deleteOrganisation)
module.exports = router