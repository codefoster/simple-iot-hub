let deviceAmqp = require('azure-iot-device-amqp');
let device = require('azure-iot-device');
let client = deviceAmqp.clientFromConnectionString(process.env.DEVICE_CONNECTION_STRING);

client.open(err => {
    let device = 'simdevice1';
    console.log(`acting as ${device}`);

    //handle C2D messages
    client.on('message', msg => {
        client.complete(msg, () => console.log('<-- cloud message received'));
    });

    // send a D2C message repeatedly
    setInterval(function () {
        let message = new device.Message(JSON.stringify({
            deviceId: device,
            value: Math.random()
        }));
        console.log('sending message to cloud -->');
        client.sendEvent(message, (err,res) => {
            if(err) console.log(err);
        });
    }, 5000);
});
