const express = require('express')
const { createOrganisation, getAllOrganisation, getOrganisationById } = require('../controllers/organisation.controller')
const router = express.Router()

router.get('/', getAllOrganisation)
router.get('/:id', getOrganisationById)
router.post('/', createOrganisation)
module.exports = router