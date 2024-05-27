const express = require("express");
const {  verifyOtp } = require("../controllers/otp.controller");
const  router = express.Router();


router.post("/", verifyOtp);
module.exports = router;