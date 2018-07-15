'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _uws = require('uws');

var _uws2 = _interopRequireDefault(_uws);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);

// app.use(morgan);

app.use((0, _cors2.default)({
    exposedHeaders: "*"
}));
app.use(_bodyParser2.default.json({
    limit: '50mb'
}));
app.set('root', __dirname);

app.get('/', function (req, res) {
    return res.send('hello');
});

app.wss = new _uws2.default.Server({
    server: app.server
});

var clients = [];

app.wss.on('connection', function (connection) {
    console.log('New Client connected');

    var userId = clients.length;

    //new client object
    var newClient = {
        ws: connection,
        userId: userId

        //new client added to clients array
    };clients.push(newClient);
    console.log('new client added', userId);

    //listen new messages from client
    connection.on('message', function (message) {
        console.log(message);

        //after getting message from client, we send back to client with new message
        connection.send(message);
    });

    connection.on('close', function () {
        console.log('client disconnected', userId);

        clients = clients.filter(function (client) {
            return client.userId !== userId;
        });
    });
});

app.get('/api/all_connections', function (req, res, next) {
    return res.json({
        people: clients
    });
});

setInterval(function () {

    // console.log(`threre are ${clients.length} in server connected`)
    if (clients.length > 0) {
        console.log('threre are ' + clients.length + ' in server connected');
        clients.forEach(function (client) {
            var msg = 'Hey is ' + client.userId + ' you got a new message from server';
            client.ws.send(msg);
            console.log('client');
        });
    }
});
var port = 3000;
app.server.listen(process.env.PORT || port, function () {
    console.log('running on port', app.server.address().port);
});

exports.default = app;
//# sourceMappingURL=index.js.map