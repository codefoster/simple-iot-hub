let deviceAmqp = require('azure-iot-device-amqp');
var device = require('azure-iot-device');
var client = deviceAmqp.clientFromConnectionString('HostName=airbus-hub.azure-devices.net;DeviceId=device1;SharedAccessKey=YVFhWIXNnf62BMsr1BsfRfFtA2JtbcE00vZwMk8+53M=');

client.open(err => {
    //handle C2D messages
    client.on('message', msg => {
        client.complete(msg, () => console.log('C2D message received <--'));
    });

    // send a D2C message repeatedly
    setInterval(function () {
        var message = new device.Message(JSON.stringify({
            deviceId: 'device1',
            value: Math.random()
        }));
        console.log('Sending D2C message -->');
        client.sendEvent(message, (err,res) => {});
    }, 5000);
});