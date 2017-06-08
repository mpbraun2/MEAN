var express = require("express");
var app = express();
// require body-parser
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({extended: true}));

// root route
app.get('/', function (req, res){
    res.render('index', {title: "my Express project"});
});
// route to process new user form data:
app.post('/users', function (req, res){
    console.log("POST DATA \n\n", req.body)
    //code to add user to db goes here!
    // redirect the user back to the root route. 
    // All we do is specify the URL we want to go to:
    res.redirect('/');
})

// Tell the express app to listen on port 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});
// this line will almost always be at the end of your server.js file (we only tell the server to listen after we have set up all of our rules)