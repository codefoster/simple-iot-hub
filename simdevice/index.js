'use strict';

var clientFromConnectionString = require('azure-iot-device-amqp').clientFromConnectionString;
var Message = require('azure-iot-device').Message;

var connectionString = 'HostName=iothub33.azure-devices.net;DeviceId=device1;SharedAccessKey=unlifMm3dbvp04jygUlOXrN0k1OT+E64ffWL4Q0sodc=';

var client = clientFromConnectionString(connectionString);

function printResultFor(op) {
    return function printResult(err, res) {
        if (err) console.log(op + ' error: ' + err.toString());
        if (res) console.log(op + ' status: ' + res.constructor.name);
    };
}

var connectCallback = function (err) {
    if (err) {
        console.log('Could not connect: ' + err);
    } else {
        console.log('Client connected');

        client.on('message', function(msg) {
            client.complete(msg, function() { console.log(msg.messageId)});
        });
        // // Create a message and send it to the IoT Hub every second
        // setInterval(function () {
        //     var windSpeed = 10 + (Math.random() * 4);
        //     var data = JSON.stringify({ deviceId: 'device1', windSpeed: windSpeed });
        //     var message = new Message(data);
        //     console.log("Sending message: " + message.getData());
        //     client.sendEvent(message, printResultFor('send'));
        // }, 1000);
    }
};

client.open(connectCallback);