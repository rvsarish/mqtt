const express = require('express');
const { getDataByTopic, getAllData, publishMessage } = require('../controllers/dataController');
const mqttClient = require('../mqttClient');

const router = express.Router();

router.post('/publish', publishMessage(mqttClient));
router.get('/data/:topic', getDataByTopic);
router.get('/all', getAllData);

module.exports = router;
