//set up express
var express = require('express');
var path = require("path");
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//npm install body-parser --save
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//make sure that ./client and ./node_modules are both present.
app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './node_modules')));

mongoose.connect('mongodb://localhost/playersDB', function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to Mongoose");
    }
});

var Schema = mongoose.Schema;

var playersSchema = new Schema({
    name: { type: String, required: true, minlength: 2 },
    position: { type: String, required: true },
    status: {type: String, required: true ,default: "Undecided"},
}, { timestamps: true });

mongoose.model('Players', playersSchema);
var Players = mongoose.model('Players');

var players = {
    index: function (req, res) {
        var promise = Players.find({}).sort({ createdAt: -1 }).exec();
        promise.then(function (players) {
            console.log("find all players: success!");
            res.json({ players: players, errors: [] });
        })
            .catch(function (err) {
                console.log('find all players: error!', err);
                res.json({ players: [], errors: err });
            });
    },
    add_player: function (req, res) {
        var newPlayer = new Players({ name: req.body.name, position: req.body.position });
        var promise = newPlayer.save();
        promise.then(function () {
            console.log("new player: success!");
            res.json({ message: "success!" });
        })
            .catch(function (err) {
                console.log("new player: error!", err);
                res.json({ errors: err });
            });
    },
    delete_player: function (req, res) {
        console.log("reached delete_player");
        var player_id = req.params.id;
        Players.remove({ _id: player_id }, function (err, message) {
            if (err) {
                console.log(err);
                res.json({ errors: err });
            } else {
                console.log("deleted");
                res.json({ message: "success" });
            }
        });
    },

}


app.get('/api', players.index);
app.post("/api/player", players.add_player);
app.delete("/api/delete_player/:id", players.delete_player);

app.listen(1337, function () { });
console.log("We are live on 1337!");