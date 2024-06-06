const express = require('express');
const { handleTurnstile } = require('../controllers/turnstile');
const router = express.Router();

router.post('/', handleTurnstile);
module.exports = router;