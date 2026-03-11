const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/authentication')

router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/user', isAuthenticated , userController.getUser);

module.exports = router;