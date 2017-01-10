# Simple Azure IoT Hub example using Node.js
The thinking behind this small repo is to do what I always tend to do, which is drop down to the simplest case for the purpose of understanding how a thing works as well as being able to communicate that with others.

This very simple case use of Azure IoT Hub uses the Node.js SDK. It contains no error checking or other production considerations, but rather does the bare minimum end-to-end scenario of an IoT device both talking to as well as listening to an Azure IoT Hub service.

The project consists of two Node.js applications each in their own directory. To run it, simply change into each directory in two different terminal windows and in each run...

``` js
npm install
node .
```

You should see D2C and C2D messages going back and forth.