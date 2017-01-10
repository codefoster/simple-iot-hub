var iothub = require('azure-iothub');
var common = require('azure-iot-common');
var client = iothub.Client.fromConnectionString('HostName=airbus-hub.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=sELHu1v/5q1Br7VR0j14C9oV/yeXT3Ucb3nxxjN1v1o=');

client.open(err => {

    // send a C2D message repeatedly
    setInterval(() => {
      var message = new common.Message(JSON.stringify({ text: 'reset-request' }));
      console.log('Sending C2D message -->');
      client.send('device1', message, (err, res) => { });
    }, 2000);
});