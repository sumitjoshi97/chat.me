const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const WebSocketServer = require('uws');
const mongoose = require('mongoose');
const keys = require('../config/keys');

// import AppRouter from './app-router';.

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();
app.server = http.createServer(app);

app.use(cors({
    exposedHeaders: "*"
}));

app.use(bodyParser.json({
    limit: '50mb'
}));

app.set('root', __dirname);

require('./routes')(app);

// app.wss = new WebSocketServer.Server({
//     server: app.server
// })

// let clients = [];


// app.wss.on('connection', (connection) => {
//     console.log('New Client connected');

//     const userId = clients.length;

//     //new client object
//     const newClient = {
//         ws: connection,
//         userId: userId
//     }

//     //new client added to clients array
//     clients.push(newClient);
//     console.log('new client added', userId)

//     //listen new messages from client
//     connection.on('message', (message) => {
//         console.log(message);

//         //after getting message from client, we send back to client with new message
//         connection.send(message)
//     })

//     connection.on('close', () => {
//         console.log('client disconnected', userId);

//         clients = clients.filter((client) => client.userId !== userId)
//     })
// })



// setInterval(() => {

//     // console.log(`threre are ${clients.length} in server connected`)
//     if (clients.length > 0) {
//         console.log(`threre are ${clients.length} in server connected`);
//         clients.forEach((client) => {
//             const msg = `Hey is ${client.userId} you got a new message from server`;
//             client.ws.send(msg);
//             console.log('client');
//         })
//     }
// })
const PORT = process.env.PORT || 5000;
app.server.listen(PORT, () => {
    console.log('running on port', app.server.address().port);
})

export default app;