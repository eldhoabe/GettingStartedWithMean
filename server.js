// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================
    


    mongoose.connect('mongodb://localhost/test');
    //mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());
    


    // define model =================
    var User = mongoose.model('User',
        new mongoose.Schema({
        firstName :String,
        lastName :String,

    }));

    // listen (start app with node server.js) ======================================
   
    
    //Start database checking
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("Database is ready");
     
   });
    
    
    
 
    
    // routes =================================================
    
    // application -------------------------------------------------------------
    app.get('/Index', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
    
    
    
    app.get('/api/users',function(request,response){



        User.find({}, 'firstName lastName', function(err,users){
            console.log(users);
            
            response.json(users);
        });
        //User.find(function(err,users){
            
        //     console.log("the users api has been hit");
            
        //     console.log(err);
        //     // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        //     if(err)
        //      response.send(err)
             
        //      console.log(users);
             
        //     response.json(users);
        // });
    });
    
    app.post('/api/users',function(request,response){
        
        //Post new user to the database
        User.create({
            firstName:request.body.firstName,
            lastName:request.body.lastName,   
        },function(err,data)
        {
            if(err)
             response.send(err);
             
             
              //Send all users back to 
            User.find(function(err,users){

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if(err)
             response.send(err)
             
            response.json(users);
            });
             
        });
    });
    
    
    //Delete
    
    app.delete('api/users:_id',function(request,response)
    {
        users.remove({
               _id:request.body._id, 
        },function(error,data)
        {
            if(error)
            response.send(error);
            
            //Send all users back to 
            User.find(function(err,users){

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if(err)
             response.send(err)
             
            response.json(users);
            });
        });
        
    });
    
    
     app.listen(8080);
    console.log("App listening on port 8080");
    
    
  