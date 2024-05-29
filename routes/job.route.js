const express = require('express');
const { createJob, getJobs, getJobsById, deleteJob, updateJob, getJobByRefId } = require('../controllers/job.controller');
const router = express.Router();

router.post('/', createJob)
router.get('/', getJobs)
// router.get('/:id', getJobsById)
router.put('/:id', updateJob)
router.delete('/:id', deleteJob)
router.get('/:refId', getJobByRefId)
module.exports= router;