const Data = require('../models/dataModel');

const saveData = async (topic, message) => {
  message.timestamp = new Date();
  
  const data = new Data({ topic, message });
  try {
    await data.save();
    console.log('Data saved to MongoDB');
  } catch (err) {
    console.error('Failed to save data to MongoDB:', err);
  }
};

const getDataByTopic = async (req, res) => {
  const { topic } = req.params;
  try {
    const data = await Data.find({ topic });
    if (data.length > 0) {
      res.json(data);
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getAllData = async (req, res) => {
  try {
    const allData = await Data.find();
    res.json(allData);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const publishMessage = (mqttClient) => (req, res) => {
  const { topic, message } = req.body;
  mqttClient.publish(topic, JSON.stringify(message), { qos: 1 }, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to publish message' });
    }
    res.json({ success: true });
  });
};

module.exports = {
  saveData,
  getDataByTopic,
  getAllData,
  publishMessage,
};
