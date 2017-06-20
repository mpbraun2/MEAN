var express = require('express');
var path = require("path");
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//use notesdb
mongoose.connect('mongodb://localhost/usersdb', function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to Mongoose");
    }
});

var Schema = mongoose.Schema;

//db.createCollection("notes")
var notesSchema = new Schema({
  text: { type: String, required: true, minlength: 3 }, //This only allows comments of 3 letters or more
}, { timestamps: true });

//show collections
mongoose.model('Notes', notesSchema);
var Notes = mongoose.model('Notes');

mongoose.Promise = global.Promise;

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//opens index.html when http://127.0.0.1:8000/
//app.use(express.static(path.join(__dirname, "./static")));
app.use(express.static(path.join(__dirname, "./client")));
app.use(express.static(path.join(__dirname, "./node_modules")));

/*
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
*/
var notes = {
    index: function(req, res){
        var promise = Notes.find({}).exec();
        promise.then(function(notes) {
                console.log("find all notes: success!");
                res.json({notes: notes, errors: [] });
        })
        .catch(function(err){
          console.log('find all notes: error!', err);
          res.json({notes: [], errors: err });
        });
    },
    new_note: function(req, res){
        var newNote = new Notes({ text: req.body.text});
        var promise = newNote.save();
        promise.then(function(usnoteser) {
            console.log("new note: success!");
            res.json({message:"success!"});
        })
        .catch(function(err){
            console.log("new note: error!",err);
            res.json({errors: err});
        });
    },
}

app.get('/api', notes.index);
app.post("/api/note",notes.new_note);

app.listen(4200, function () {
  console.log("listening on port","4200");
});