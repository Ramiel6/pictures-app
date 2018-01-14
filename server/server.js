var http = require('http');
var path = require('path');
require('dotenv').config();
// var async = require('async');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
// var React = require('react');

var routes = require('./routes.js');
var authRoutes = require('./auth/authRoutes.js');
var Account = require('./auth/account.js');
var picture = require('./pictureModel.js');




var app = express();
var server = http.createServer(app);
app.use(cookieParser('HardSecret')); // cookie parser must use the same secret as express-session.
const cookieExpirationDate = new Date();
const cookieExpirationDays = 365;
cookieExpirationDate.setDate(cookieExpirationDate.getDate() + cookieExpirationDays);

app.use(session({
	secret: 'HardSecret', // must match with the secret for cookie-parser
	resave: true,
	saveUninitialized: true,
	cookie: {
	    // httpOnly: true,
	    expires: cookieExpirationDate // use expires instead of maxAge
	}
 } ));
//  app.use(function(req, res, next) {  
//       res.header('Access-Control-Allow-Origin', req.headers.origin);
//       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//       next();
//  }); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '../client')));
app.use(passport.initialize());
app.use(passport.session());
require('./auth/passportConfig.js')(app, passport, Account);

// database
var url = 'mongodb://'+ process.env.IP +'/pinterest';
mongoose.Promise = global.Promise;
mongoose.connect(url,{ useMongoClient: true });

//routes
authRoutes(app, passport, Account);
routes(app,passport,picture,Account);

// const env = process.env.NODE_ENV || 'production';
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server is listening at", addr.address + ":" + addr.port);
});