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
  console.log("Database connection established, ready for CRUDding :)");
});

//
// CRUD - A simple database create, read, update, delete interface.
//
app.post('/users', function(req, res) {
  console.log(req.body.username);
  thedb.collection('users')
  .insertOne( { 'username': req.body.username },
    function(err, result) {
      if ( err ) {  res.status(500).send( {error: 'Error creating a user :('} ); }
      else
        res.status(200).send();
    });
});

app.get('/users', function(req, res) {
  
  var cursor = thedb.collection('users').find( );
  var usersNowInDatabase = [];
  cursor.each(function(err, doc) {
     if (doc != null) {
        console.log("user in db: ", doc);
        usersNowInDatabase.push(doc);
     } else
        res.json(usersNowInDatabase);
  });
});
  
app.put('/users', function(req, res) {
  console.log("Updating username: " + req.body.username + " to " + req.body.newusername);
  thedb.collection('users')
  .update( { 'username' : req.body.username }, {$set:{username: req.body.newusername} },
  function(err, result) {
    if ( err ) {  res.status(500).send( {error: 'Error updating username :('} ); }
    else
      res.status(200).send();
  });
});

//NOTE: The DELETE verb in Angular 1 does not carry a req.body object.
app.delete('/users', function(req, res) {
  //NOTE: The delete should be ID based, not name. This is for demo purposes.
  console.log('Deleting username:' + JSON.stringify(req.query));
  thedb.collection('users')
  .deleteOne( { 'username': req.query.username },
    function(err, result) {
      if ( err ) { res.status(500).send( {error: 'Error with username :('} ); }
      else
        res.status(200).send();
    });
});

//This is for resetting the DB if so desired :)
app.delete('/deleteallusers', function(req, res) {
  console.log('Deleting all users from the DB...');
  thedb.collection('users')
    .remove();
  res.status(200).send();
});

// Incase the user wanders off to somewhere where he shouldn't.
app.use(function (req, res, next) {
  res.status(404).send("404 :3 These are not the pages you were looking for...");
});

app.listen(80, function() { console.log("MEAN Stack Tutorial NodeJS Server active on port 80..."); } );
