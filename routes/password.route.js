const express = require('express');
const { forgotPassword, resetPassword } = require('../controllers/password.controller');
const router = express.Router();


router.post('/', forgotPassword)
router.put('/:id', resetPassword)
module.exports = router;