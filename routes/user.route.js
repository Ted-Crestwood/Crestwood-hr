const express = require('express');
const {createUser,getUser, signInUser, getUserById, getUserByRefId} = require('../controllers/user.controller');
const router = express.Router();

router.get('/',getUser)
router.post('/signup', createUser);
router.post('/signin',signInUser)
router.get('/:refId', getUserByRefId);
// router.get('/:id',getUserById)
module.exports = router;
