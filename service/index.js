let eventhubs = require('azure-event-hubs');
var client = eventhubs.Client.fromConnectionString('HostName=airbus-hub.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=sELHu1v/5q1Br7VR0j14C9oV/yeXT3Ucb3nxxjN1v1o=');

client.open()
    .then(() => console.log('ready'))
    .then(client.getPartitionIds.bind(client))
    .then(pids =>
        //enumerate the partitions
        pids.map(pid =>
            client.createReceiver('$Default', pid, { 'startAfterTime': Date.now() })
                .then(receiver =>
                    //handle D2C messages
                    receiver.on('message', msg =>
                        console.log('D2C message received <--')
                    )
                )
        )
    );