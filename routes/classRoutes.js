const express = require('express');
const router = express.Router();

const classController = require('../controllers/classController');

router.get('/classes', classController.getClasses);

router.post('/create-class', classController.createClass);

router.get('/class/:uuid', classController.getClassByUUID);

module.exports = router;
