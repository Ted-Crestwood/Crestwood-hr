const express = require('express');
const { createSubscription, getSubscribers } = require('../controllers/subscription.controller');
const router = express.Router();

router.post("/", createSubscription)
router.get("/", getSubscribers)
module.exports = router;