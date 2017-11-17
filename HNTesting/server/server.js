var express  = require('express'),
    mongoose = require('mongoose'),
    util     = require('util'),
    fs       = require('fs');

var app = express();

// connection with the db 
var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/mydb';

mongoose.connect(uristring, {}, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

var models_path = __dirname + '/models';
fs.readdirSync(models_path).forEach(function(file) {
  util.puts('load model ' + file);
    require(models_path + '/' + file);
}); 
// end mongoose 

require('./config/middleware.js')(app, express);

module.exports = app;