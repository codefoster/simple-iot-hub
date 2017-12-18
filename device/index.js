let deviceAmqp = require('azure-iot-device-amqp');
let device = require('azure-iot-device');

require('dotenv').config();
let client = deviceAmqp.clientFromConnectionString(process.env.DEVICE_CONNECTION_STRING);

client.open(err => {
    let deviceName = 'simdevice1';
    console.log(`acting as ${deviceName}`);

    //handle C2D messages
    client.on('message', msg => {
        client.complete(msg, () => console.log('<-- cloud message received'));
    });

    // send a D2C message repeatedly
    setInterval(function () {
        let message = new device.Message(JSON.stringify({
            deviceId: deviceName,
            value: Math.random()
        }));
        console.log('sending message to cloud -->');
        client.sendEvent(message, (err,res) => {
            if(err) console.log(err);
        });
    }, 5000);
});
