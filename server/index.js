var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var request = require('request');
let app = express();
var database = require('../database/index.js');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));


app.listen(3000, function(){
  console.log('listening on port 3000!')
});
