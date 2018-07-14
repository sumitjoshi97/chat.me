import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import WebSocketServer from 'uws';

const app = express();
app.server = http.createServer(app);

app.use(morgan);

app.use(cors({
    exposedHeaders: "*"
}));
app.use(bodyParser.json({
    limit: '50mb'
}));
app.set('root', __dirname);

app.get('/', (req, res) => {
    return res.send('hello')
})

app.wss = new WebSocketServer.Server({
    server: app.server
})

let clients = [];


app.wss.on('connection', (connection) => {
    console.log('New Client connected');

    const userId = clients.length;

    //new client object
    const newClient = {
        ws: connection,
        userId: userId
    }

    //new client added to clients array
    clients.push(newClient);
    console.log('new client added', userId)

    //listen new messages from client
    connection.on('message', (message) => {
        console.log(message);

        //after getting message from client, we send back to client with new message
        connection.send(message)
    })

    connection.on('close', () => {
        console.log('client disconnected', userId);

        clients = clients.filter((client) => client.userId !== userId)
    })
})

app.get('/api/all_connections', (req, res, next) => {
    return res.json({
        people: clients
    })
})

setInterval(() => {

    // console.log(`threre are ${clients.length} in server connected`)
    if (clients.length > 0) {
        console.log(`threre are ${clients.length} in server connected`);
        clients.forEach((client) => {
            const msg = `Hey is ${client.userId} you got a new message from server`;
            client.ws.send(msg);
            console.log('client');
        })
    }
})
const port = 3000;
app.server.listen(process.env.PORT || port, () => {
    console.log('running on port', app.server.address().port);
})

export default app;