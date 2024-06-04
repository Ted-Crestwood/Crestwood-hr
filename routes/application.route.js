const express = require('express');
const multer = require('multer');
const { createApplication, getApplications, getApplicationsById, getTotalApplications, getApplicationsLast30Days } = require('../controllers/application.controller');
const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
});

// router.get('/',getApplications)
router.get('/:id', getApplicationsById)
router.post('/',  createApplication);
router.get('/total', getTotalApplications)
router.get('/thirtydays',getApplicationsLast30Days)
module.exports = router;