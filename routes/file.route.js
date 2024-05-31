const express = require('express');
const multer = require('multer');
const signedUrlFunction = require('../controllers/file.controller');
const storage = multer.memoryStorage();
const router = express.Router()

const upload = multer({ storage: storage })

    // 
    router.post('/signed_url',  signedUrlFunction);
    module.exports = router;
