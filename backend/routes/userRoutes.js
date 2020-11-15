const express = require('express');
const router = express.Router();
const { authUser, registerUser, getUserProfile, updateUserProfile } = require ('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')


router.post('/login', authUser)
router.post('/',registerUser)
//protect the route by passing the middleware as first argument
router.route('/profile').get(protect, getUserProfile)
router.route('/profile').put(protect, updateUserProfile)

module.exports = router;