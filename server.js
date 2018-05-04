var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
var SuperLogin = require('superlogin').default;
var path = require('path');
var config = require('./config.js');
//      "superlogin": "agentilela/superlogin"

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
   next();
});
 
// Initialize SuperLogin
var superLoginPromise = SuperLogin(config);
// Mount SuperLogin's routes to our app
// app.use('/auth', superlogin.router);
superLoginPromise.then((superLogin) => {
  app.use('/auth', superLogin.router);
  app.listen(app.get('port'));
  console.log("App listening on " + app.get('port'));
}, (error) => {
  console.log(error);
});
