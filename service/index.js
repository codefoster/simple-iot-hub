let iothub = require('azure-iothub');
let common = require('azure-iot-common');
let eventhubs = require('azure-event-hubs');

require('dotenv').config();
let connectionString = process.env.IOTHUB_CONNECTION_STRING;
let eventhubsClient = eventhubs.Client.fromConnectionString(connectionString);
let iothubClient = iothub.Client.fromConnectionString(connectionString);

//open event hubs client for handling D2C messages
console.log('Connecting using the following connection string:');
console.log(connectionString);

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
                        console.log('<-- device message received')
                    )
                )
        )
    );

//open iothub client for handling C2D messages
iothubClient.open(err => {
    if(err) console.log('Error opening iothubClient: ' + err);
    // send a C2D message repeatedly
    setInterval(() => {
        let device = 'simdevice1';
        let message = new common.Message(JSON.stringify({ text: 'reset-request' }));
        console.log(`sending message to ${device} -->`);
        iothubClient.send(device, message, (err, res) => {
            if (err) console.log(err);
        });
    }, 5000);
});