// import WebSocket from 'uws';
const WebSocket = require('uws');

const ws = new WebSocket('ws://localhost:3000/');

ws.on('open', () => {
    console.log('client connected to server');
    
    ws.send('hello server my name is client');
    
    ws.on('message', (message) => {
        console.log(message);
    })
})