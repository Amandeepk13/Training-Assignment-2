const express = require('express');
const router = express.Router();

const viewController = require('../controllers/viewController')

router.get('/login', viewController.loginPage);
router.get('/dashboard', viewController.dashboardPage);
router.get('/create-class', viewController.createClassPage);
router.get('/class/:uuid', viewController.classPage);

module.exports = router;
