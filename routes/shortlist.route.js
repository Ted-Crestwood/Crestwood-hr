const express = require('express');
const { createShortlst, getShortlistById, getShortlist } = require('../controllers/shortlist.controller');
const router = express.Router();


router.post("/", createShortlst)
router.get("/:id", getShortlistById)
router.get('/', getShortlist)
module.exports = router;