var express = require('express');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookapi');
var Book = require('./models/bookModel');
var app = express();
var port = process.env.PORT || 3000;

var bookRouter = express.Router();

bookRouter.route('/Books')
	.get(function(req, res) {
		var query = {};

		// Sanitize
		if(req.query.genre) {
			query.genre = req.query.genre;
		}
		Book.find(query, function(err, books) {
			if(err)
				console.log(err);
			else
				res.json(books);
		});
	});

app.use('/api', bookRouter); 


app.get('/', function(req, res) {
	res.send('welcome to my API!');
});

app.listen(port, function() {
	console.log('Gulp is running on PORT: ' + port);
});