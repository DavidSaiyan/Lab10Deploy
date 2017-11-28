// Set up packages and imports
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io     = require("socket.io")(http);

//Configure App
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var port = process.env.PORT || 4215;

app.get('/', function(req, res){
    res.send('<h1>Listening...</h1>');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('msg', function(data){
        console.log('message: ' + data.Message);
        console.log(data.ChatId);
        io.emit(data.ChatId, data);
    });

});

http.listen(port, function(){
    console.log('listening on *:' + port);
});

io.on('disconnect', function(){
    console.log('user disconnected');
});

//Start Server
//app.listen(port);
console.log('listening on *:' + port);