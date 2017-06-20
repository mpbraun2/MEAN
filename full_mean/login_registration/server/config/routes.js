var mongoose = require('mongoose');//Cannot require Mongoose globally, need to require it everywhere used
var Users = require('./../controllers/users.js');//this route file will tell the app which controller to go to.
//************RESTful routes for users************
module.exports = (function(app){ //this tells the app to export all the following routes when required (available to entire app!)
app.get('/users', Users.index); //these are methods that should exist in controller (users.js), sends to users.js
//app.get('/users/new', Users.new);
app.get('/users/:id', Users.show); //break glass in case of emergency
//app.get('/users/:id/edit', Users.edit);
app.post('/users', Users.create); //break glass in case of emergency
app.put('/users/:id', Users.update); //break glass in case of emergency
app.delete('/users/:id', Users.delete); //break glass in case of emergency

app.post('/login', Users.login); console.log("Heeeey");
app.post('/register', Users.register);
});
//************END routes for users****************