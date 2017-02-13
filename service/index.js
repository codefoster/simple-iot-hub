var iothub = require('azure-iothub');
var common = require('azure-iot-common');
let eventhubs = require('azure-event-hubs');

var connectionString = '<IOTHUB_CONNECTION_STRING>';
var eventhubsClient = eventhubs.Client.fromConnectionString(connectionString);
var iothubClient = iothub.Client.fromConnectionString(connectionString);

//open event hubs client for handling D2C messages
eventhubsClient.open()
    .then(() => console.log('ready'))
    .then(() => eventhubsClient.getPartitionIds())
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

//open iothub client for handling C2D messages
iothubClient.open(err => {
    // send a C2D message repeatedly
    setInterval(() => {
      var message = new common.Message(JSON.stringify({ text: 'reset-request' }));
      console.log('Sending C2D message -->');
      iothubClient.send('device1', message, (err, res) => { });
    }, 5000);
});