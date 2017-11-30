// Set up packages and imports
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io     = require("socket.io")(http);

var db = require('./app/services/database.js');

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
var router = express.Router();

app.get('/', function(req, res){
    res.send('<h1>Listening...</h1>');
});

app.get('/languages', function (req, res){
    db.getLanguages().then(function (data){
        db.close();
        res.json(data.recordset);
    },
    function (err){
         console.log(err);
         db.close();
         return err;
    })
});

app.post('/signin', function (req, res){
    db.SignIn(req.body).then(function (data){
            db.close();
            res.json(data.recordset);
        },
        function (err){
            console.log(err);
            db.close();
            return err;
        })
});

app.post('/getrooms', function (req, res){
    db.close();
    db.getRooms(req.body).then(function (data){
            db.close();
            res.json(data.recordset);
        },
        function (err){
            console.log(err);
            db.close();
            return err;
        })
});

app.post('/addguest', function (req, res){
    console.log('adding guest');
    db.addGuest(req.body).then(function (data){
            db.close();
            res.json('successfully added guest.');
        },
        function (err){
            console.log(err);
            db.close();
            return err;
        })
});

app.post('/removeguest', function (req, res){
    console.log('adding guest');
    db.removeGuest(req.body).then(function (data){
            db.close();
            res.json('Successfully removed guest');
        },
        function (err){
            console.log(err);
            db.close();
            return err;
        })
});


app.post('/getguests', function (req, res){
    db.getGuests(req.body).then(function (data){
            db.close();
            res.json(data.recordset);
        },
        function (err){
            console.log(err);
            db.close();
            return err;
        })
});

app.post('/addroom', function (req, res){
    db.addRoom(req.body).then(function (data){
            db.close();
            res.json(data.recordset);
        },
        function (err){
            console.log(err);
            db.close();
            return err;
        })
});

app.post('/addfriend', function (req, res){
    db.addFriend(req.body).then(function (data){
            db.close();
            res.json('You are now friends with ' + req.body.name);
        },
        function (err){
            console.log(err);
            db.close();
            return err;
        })
});

app.post('/getfriends', function (req, res){
    db.getFriends(req.body).then(function (data){
            db.close();
            res.json(data.recordset);
        },
        function (err){
            console.log(err);
            db.close();
            return err;
        })
});

app.post('/register', function (req, res){
    db.checkIfUserExists(req.body.username).then(function (resp){
        //console.log(resp.recordset[0].username);
        if(resp.recordset.length > 0 && resp.recordset[0].username === req.body.username){
            db.close();
            res.json('The user already exists');
        }
        db.close();
        db.RegisterUser(req.body).then(function (data){
                db.close();
                res.json('Successfully registered ' + req.body.username);
            },
            function (err){
                console.log(err);
                db.close();
                return err;
            })
    }, function (err){
        console.log(err);
        db.close()
        return err;
    })
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


