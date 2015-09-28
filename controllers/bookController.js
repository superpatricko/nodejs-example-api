var bookController = function(Book) {
	var post = function(req, res) {
		var book = new Book(req.body);
		book.save(); // this will save the book to our database
		res.status(201).send(book); // 201 means created
	}

	var get = function(req, res) {
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
	};

	return {
		post: post,
		get: get
	}
}

module.exports = bookController;