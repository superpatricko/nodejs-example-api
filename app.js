var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookapi');
var Book = require('./models/bookModel');
var app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json); // allows reading bodies or requests

var bookRouter = express.Router();

bookRouter.route('/Books')
	.post(function(req, res) {
		var book = new Book(req.body);
		book.save(); // this will save the book to our database
		res.status(201).send(book); // 201 means created
	})
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

bookRouter.route('/Books/:bookId')
	.get(function(req, res){
		Book.findById(req.params.bookId, function(err, book) {
			if(err)
				console.log(err);
			else
				res.json(book);
		});
	});

app.use('/api', bookRouter); 


app.get('/', function(req, res) {
	res.send('welcome to my API!');
});

app.listen(port, function() {
	console.log('Gulp is running on PORT: ' + port);
});