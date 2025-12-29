const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

// Protect route: Must be Logged In AND must be Admin
router.get('/', protect, admin, getUsers);

module.exports = router;