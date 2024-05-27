const express = require("express");
const { generateOtp } = require("../controllers/otp.controller");
const  router = express.Router();


router.post("/", generateOtp);
module.exports = router;