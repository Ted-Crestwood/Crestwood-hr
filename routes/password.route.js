const express = require('express');
const { forgotPassword, resetPassword, passwordCodeVerificaton } = require('../controllers/password.controller');
const router = express.Router();


router.post('/', forgotPassword)
router.post('/code',passwordCodeVerificaton)
router.put('/:refId', resetPassword)
module.exports = router;