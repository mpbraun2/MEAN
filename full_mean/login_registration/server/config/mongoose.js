// require this file in your server (so it loads your models) This is where the Mongoose connect goes.
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
mongoose.connect('mongodb://localhost/myDB');
mongoose.Promise = global.Promise; //takes care of the depreciation warnings.
var models_path =path.join( __dirname , '/../models');
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') > 0) {
    require(models_path + '/' + file);
  }
})