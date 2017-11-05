// Set up packages and imports
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongo      = require('./app/services/mongo');


//Configure App
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var port = process.env.PORT || 4215;
var router = express.Router();

// Routing Middleware
router.use(function(req, res, next) {
    //console.log("req");
    next();
});

router.route('/lab10/insert')
    .post(function(req, res) {

        console.log(req);
        var food = {
            name: req.body.name,
            type: req.body.type
        }

        mongo.addObject("Lab10Collection", food);

        res.json({ message: "Successfully added " + food.name + " to the database"})
    });

router.route('/lab10/delete')
    .post(function(req, res) {
        var food = {
            name: req.body.name
        }

        mongo.removeObject("Lab9Collection", food);

        res.json({ message: "Successfully removed " + food.name + " from the database"})
    });

router.get('/lab10/food', function(req, res){
    var response = mongo.findAllFromCollection("Lab9Collection");
    res.json(response);
})

router.get('/yelp/:terms/:language', function(req, res) {
    res.json({message: "yelp endpoint"});
});

router.get('/', function(req, res) {
    res.json({msg: 'lab 10 api!'})
});


//Register Routes
app.use('/api', router);

//Start Server
app.listen(port);
console.log('Application Port is:  ' + port);
