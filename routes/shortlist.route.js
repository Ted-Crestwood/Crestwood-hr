const express = require('express');
const { createShortlst, getShortlistById, getShortlist, updateShortlist, deleteShortlist } = require('../controllers/shortlist.controller');
const router = express.Router();


router.post("/", createShortlst)
router.get("/:id", getShortlistById)
router.get('/', getShortlist)
router.put('/:id', updateShortlist)
router.delete('/:id', deleteShortlist)
module.exports = router;