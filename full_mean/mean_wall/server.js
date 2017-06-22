var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "client")));
app.use(express.static(path.join(__dirname, "node_modules")));



require("./server/config/mongoose");
require("./server/config/routes")(app);

app.listen(4200, function () {
    console.log("Tuning in on Port 4200");
});