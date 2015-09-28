var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookapi');
var Book = require('./models/bookModel');
var app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json); // allows reading bodies or requests

bookRouter = require('./routes/bookRoutes')(Book); // execute in order to return it

app.use('/api/books', bookRouter);

app.get('/', function(req, res) {
	res.send('welcome to my API!');
});

app.listen(port, function() {
	console.log('Gulp is running on PORT: ' + port);
});