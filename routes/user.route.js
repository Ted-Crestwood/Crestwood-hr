const express = require('express');
const {createUser,getUser, signInUser, getUserById} = require('../controllers/user.controller');
const router = express.Router();

router.post('/', createUser);
router.get('/',getUser)
router.post('/',signInUser)
router.get('/',getUserById)
module.exports = router;
// const express = require('express');
// const { createUser, getUser, signInUser, getUserById } = require('../controllers/user.controller');
// const router = express.Router();

// // Create a new user
// router.post('/signup', createUser);

// // Sign in user
// router.post('/signin', signInUser);

// // Get all users
// router.get('/', getUser);

// // Get user by ID
// router.get('/:id', getUserById);

// module.exports = router;
