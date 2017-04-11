let deviceAmqp = require('azure-iot-device-amqp');
var device = require('azure-iot-device');
var client = deviceAmqp.clientFromConnectionString(process.env.DEVICE_CONNECTION_STRING);

client.open(err => {
    //handle C2D messages
    client.on('message', msg => {
        client.complete(msg, () => console.log('<-- cloud message received'));
    });

    // send a D2C message repeatedly
    setInterval(function () {
        var message = new device.Message(JSON.stringify({
            deviceId: 'simdevice1',
            value: Math.random()
        }));
        console.log('sending message to cloud -->');
        client.sendEvent(message, (err,res) => {
            if(err) console.log(err);
        });
    }, 5000);
});
