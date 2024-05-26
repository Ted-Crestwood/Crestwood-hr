const express = require('express');
const {createUser,getUser, signInUser, getUserById} = require('../controllers/user.controller');
const router = express.Router();

router.get('/',getUser)
router.post('/', createUser);
router.post('/',signInUser)
router.get('/:id',getUserById)
module.exports = router;
