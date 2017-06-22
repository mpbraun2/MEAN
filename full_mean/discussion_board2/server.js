var express = require('express');
var app = express()
var path = require('path')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './node_modules')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app)

app.listen(4200, function () {
    console.log('Coming to you live from channel 4200!')
})