const express = require('express');
const multer = require('multer');
const { createApplication, getApplications } = require('../controllers/application.controller');
const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
});

router.get('/',getApplications)
router.post('/',  createApplication);
module.exports = router;