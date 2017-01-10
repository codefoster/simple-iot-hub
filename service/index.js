var iothub = require('azure-iothub');
var common = require('azure-iot-common');
let eventhubs = require('azure-event-hubs');

var eventhubsClient = eventhubs.Client.fromConnectionString('HostName=airbus-hub.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=sELHu1v/5q1Br7VR0j14C9oV/yeXT3Ucb3nxxjN1v1o=');
var iothubClient = iothub.Client.fromConnectionString('HostName=airbus-hub.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=sELHu1v/5q1Br7VR0j14C9oV/yeXT3Ucb3nxxjN1v1o=');

eventhubsClient.open()
    .then(() => console.log('ready'))
    .then(eventhubsClient.getPartitionIds.bind(eventhubsClient))
    .then(pids =>
        //enumerate the partitions
        pids.map(pid =>
            eventhubsClient.createReceiver('$Default', pid, { 'startAfterTime': Date.now() })
                .then(receiver =>
                    //handle D2C messages
                    receiver.on('message', msg =>
                        console.log('D2C message received <--')
                    )
                )
        )
    );

iothubClient.open(err => {
    // send a C2D message repeatedly
    setInterval(() => {
      var message = new common.Message(JSON.stringify({ text: 'reset-request' }));
      console.log('Sending C2D message -->');
      iothubClient.send('device1', message, (err, res) => { });
    }, 5000);
});