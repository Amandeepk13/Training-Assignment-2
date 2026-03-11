const express = require('express');
const router = express.Router();

const classController = require('../controllers/classController');
const { isAuthenticated } = require('../middleware/authentication');

router.get('/classes', isAuthenticated ,classController.getClasses);

router.post('/create-class', isAuthenticated ,classController.createClass);

router.get('/class/:uuid', isAuthenticated , classController.getClassByUUID);

module.exports = router;
