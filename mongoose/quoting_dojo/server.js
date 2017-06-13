var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path'),
    port = 8000,
    app = express();

//Set up body-parser to parse form data
app.use(bodyParser.urlencoded({extended: false}));

//set up database connection, schema, model --
mongoose.connect('mongodb://localhost/quoting_dojo');

var QuoteSchema = new mongoose.Schema({
    name: String,
    quote:String
});

var Quote = mongoose.model('quotes', QuoteSchema);

Quote.create({name: "Michael", quote: "Hello there!"});

//Point Server to Views
app.set('views', path.join(__dirname, './views'));
//We're using EJS as our view engine
app.set('view engine', 'ejs');

//Here are our routes!
app.get('/', function(req, res){
    
    res.render('welcome')
});

app.get('/quotes', function(req, res){
    //Logic to grab all the quotes and pass into the rendered view
    Quote.find({}, function(err, results){
        if(err) {console.log(err); }
        res.render('quotes');
    });
});

app.post('quotes', function(req, res){
    Quote.create(req.body, function(err){
        if(err) {console.log(err); }
        res.redirect('/quotes');
    });
});
//END OF ROUTING

app.listen(port);