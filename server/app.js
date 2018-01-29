'use strict';

// Set default environment variables
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.NODE_CONFIG_DIR = __dirname + '/config/';

var express = require('express');
var config = require('./config/default');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var history = require('connect-history-api-fallback');
var routes = require('./src/routes');
var data = require('./src/data');



/**
 * MongoDB configurations
 */
var mongodbUrl = 'mongodb://' + config.DB_HOST + ':' + config.DB_PORT + '/' + config.DB_NAME;

// Database options
// Option auto_reconnect is defaulted to true
var dbOptions = {
  server: {
    reconnectTries: -1, // always attempt to reconnect
    socketOptions: {
      keepAlive: 120
    }
  }
};


/**
 * Express app configurations
 */
var app = express();
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 1000000
}));
// Enable CORS
app.use(cors());



data.put();



// Static files
app.use(history());
app.use('/', express.static(__dirname + '/../dist'));
app.use('/static', express.static(__dirname + '/imgs/'));

app.listen(3000, function () {
  console.log('app listening on port %d in %s mode', this.address().port, app.settings.env);
});

module.exports = app;
