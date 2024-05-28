const express = require('express');
const { updateShortlist, deleteShortlist } = require('../controllers/shortlist.controller');
const router = express.Router();



router.put('/:id', updateShortlist)
router.delete('/:id', deleteShortlist)
module.exports = router;