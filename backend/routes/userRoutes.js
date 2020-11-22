const express = require('express');
const router = express.Router();
const { authUser, registerUser, getUserProfile, updateUserProfile, getUsers } = require ('../controllers/userController')
const { protect, admin } = require('../middleware/authMiddleware')


router.post('/login', authUser)
router.route('/',registerUser).get(protect, admin, getUsers)
//protect the route by passing the middleware as first argument
router.route('/profile').get(protect, getUserProfile)
router.route('/profile').put(protect, updateUserProfile)

module.exports = router;