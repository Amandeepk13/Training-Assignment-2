const express = require('express');
const router = express.Router();

const viewController = require('../controllers/viewController')
const { isAuthenticated } = require('../middleware/authentication')

router.get('/login', viewController.loginPage);
router.get('/dashboard', isAuthenticated ,viewController.dashboardPage);
router.get('/create-class', isAuthenticated ,viewController.createClassPage);
router.get('/class/:uuid', isAuthenticated ,viewController.classPage);

module.exports = router;
