const express = require('express');
const { handleTurnstile, handleTurnstilePost } = require('../controllers/turnstile');
const router = express.Router();

// router.post('/', handleTurnstile);
router.post('/', handleTurnstilePost)
module.exports = router;