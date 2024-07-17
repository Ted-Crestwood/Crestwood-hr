const express = require('express');
const { createSubscription, getSubscribers } = require('../controllers/subscription.controller');
const router = express.Router();

router.post("/subscribe", createSubscription)
router.get("/subscribers", getSubscribers)
module.exports = router;