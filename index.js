var express = require('express');
var bodyParser = require('body-parser');
var dbclient = require('mongodb').MongoClient;
var thedb = null;

// The App 'global'
var app = express();

// Serve the files from the /public folder automatically without having to use res.sendfile etc.
app.use(express.static(__dirname + "/public"));

// Bodyparser enables easier handling of data in the endpoints.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// The database, you could replace this with mysql as well if you want a relational one.
dbclient.connect('mongodb://127.0.0.1:27017/test', function (err, db) {
  if (err) { throw err; }
  thedb = db;
  console.log("Database connection OK.");
});

//
// CRUD - A simple database create, read, update, delete interface.
//
app.post('/createuser', function(req, res) {
  console.log(req.body.username);
  thedb.collection('users')
  .insertOne( { 'username': req.body.username },
    function(err, result) {
      res.status(200).send();
    });
});

app.get('/readusers', function(req, res) {
  
  var cursor = thedb.collection('users').find( );
  var usersNowInDatabase = [];
  cursor.each(function(err, doc) {
     if (doc != null) {
        console.log("user in db: ", doc);
        usersNowInDatabase.push(doc);
     } else {
        res.json(usersNowInDatabase);
     }
  });
});
  
app.post('/updateuser', function(req, res) {
  console.log("Updating username: " + req.body.username + " to " + req.body.newusername);
  thedb.collection('users')
  .update( { 'username' : req.body.username }, {$set:{username: req.body.newusername} },
  function(err, result) {
    if ( err ) { throw err; }
    res.status(200).send();
  });
});

app.post('/deluser', function(req, res) {
  console.log("Trying to delete username: ", req.body.username);
  thedb.collection('users')
  .deleteOne( { 'username': req.body.username },
    function(err, result) {
      res.status(200).send();
    });
});

// Incase the user wanders off to somewhere where he shouldn't.
app.use(function (req, res, next) {
  res.status(404).send("404 :3 These are not the pages you were looking for...");
});

app.listen(80, function(){ console.log("NodeJS Server is now listening on port 80..."); } );
