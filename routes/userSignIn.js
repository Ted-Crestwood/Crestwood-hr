const express = require('express');
const {signInUser} = require('../controllers/user.controller');
const router = express.Router();


router.post('/',signInUser)
module.exports = router;
