const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const dataRoutes = require('./routes/dataRoutes');
const { saveData } = require('./controllers/dataController');
const mqttClient = require('./mqttClient');

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/', dataRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

mqttClient.on('message', async (topic, message) => {
  await saveData(topic, JSON.parse(message.toString()));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
