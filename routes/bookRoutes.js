var express = require('express');

var routes = function(Book) {
	var bookRouter = express.Router();

	bookRouter.route('/')
		.post(function(req, res) {
			var book = new Book(req.body);
			book.save(); // this will save the book to our database
			res.status(201).send(book); // 201 means created
		})
		.get(function(req, res) {
			var query = {};
			res.send('derp');

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

	bookRouter.route('/:bookId')
		.get(function(req, res){
			Book.findById(req.params.bookId, function(err, book) {
				if(err)
					console.log(err);
				else
					res.json(book);
			});
		})
		.put(function(req, res) {
			Book.findById(req.params.bookId, function(err, book) {
				if(err)
					console.log(err);
				else
					book.title = req.body.title;
					book.author = req.body.author;
					book.genre = req.body.genre;
					book.read = req.body.read;
					res.json(book);
			});

		});

	return bookRouter;
};

module.exports = routes;