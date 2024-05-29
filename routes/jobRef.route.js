const express = require('express');
const { getJobByRefId } = require('../controllers/job.controller');
const router = express.Router();

router.get('/:refId', getJobByRefId)
module.exports= router;