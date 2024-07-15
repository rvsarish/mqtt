const mqtt = require('mqtt');
const client = mqtt.connect('mqtts://da0bd23105534b68ac7bdf3415cbd4c4.s1.eu.hivemq.cloud:8883', {
  username: 'SARISH',
  password: 'SARISH1a'
});

client.on('connect', () => {
  console.log('Connected to HiveMQ broker');
  client.subscribe('#');
});

client.on('error', (err) => {
  console.error('MQTT connection error:', err);
});

client.on('message', (topic, message) => {
  console.log(`Received message from ${topic}: ${message.toString()}`);
});

module.exports = client;
