'use strict';

// import WebSocket from 'uws';
var WebSocket = require('uws');

var ws = new WebSocket('ws://localhost:3000/');

ws.on('open', function () {
    console.log('client connected to server');

    ws.send('hello server my name is client');

    ws.on('message', function (message) {
        console.log(message);
    });
});
//# sourceMappingURL=client.js.map