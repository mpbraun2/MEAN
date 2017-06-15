var express = require("express");
var app = express();

app.use(express.static('./client'));
app.use(express.static('./bower_components'));

app.listen(4200, function () {
  console.log("LISTENING ON 4200");
});