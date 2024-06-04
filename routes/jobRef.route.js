const express = require('express');
const { getJobByRefId, getOpenJobs } = require('../controllers/job.controller');
const router = express.Router();

router.get('/jobs', getOpenJobs)
router.get('/:refId', getJobByRefId)
module.exports= router;