// routes/upload.route.js
const express = require('express');
const { createAwsBucket } = require('../controllers/application.controller');
const { generateUrl,generateUrlNoClient,generateUrlForGetWithS3,generateUrlForGetWithoutS3 } = require('../controllers/upload.controller');
const { main } = require('../files');
const router = express.Router();

// router.get('/generate-put-url-client', generateUrl);

router.get('/', main);

// router.get('/generate-get-url-client', generateUrlForGetWithS3);

// router.get('/generate-get-url-no-client', generateUrlForGetWithoutS3);
  
module.exports = router;
