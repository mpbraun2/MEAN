//set up express
var express=require('express'),
app = express(),
path = require('path');
//npm install body-parser --save
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());//put this into JSON.

//make sure that ./client and ./node_modules are both present.
app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './node_modules')));

//require the config files of mongoose and routes. This is the backend.
require('./server/config/mongoose.js'); 
require('./server/config/routes.js')(app); //allows up to set up the routes

app.listen(8000, function() {});
    console.log("We are live on 8000!");
