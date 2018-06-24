module.exports = function (app) {

    app.post('/api/authoredbook/:bookId', addAuthoredBook);
    app.delete('/api/authoredbook/:bookId', removeAuthoredBook);
    app.get('/api/book/authors', findAuthoredBooksForUser);
    app.get('/api/user/:userId/authored', findAuthoredBooksUserById);

    var authoredBookModel = require('../models/authoredBook/authoredBook.model.server');

    function addAuthoredBook(req, res) {
        var bookId = req.params.bookId;
        var currentUser = req.session.currentUser;
        var userId = currentUser._id;
        var authored = {
            user: userId,
            book: bookId
        };
        authoredBookModel.addAuthoredBook(authored)
            .then(function (authored) {
                res.json(authored);
            })
    }
    function findAuthoredBooksForUser(req, res) {
        var currentUser = req.session.currentUser;
        var userId = currentUser._id;
        authoredBookModel
            .findAuthoredBooksForUser(userId)
            .then(function(authors) {
                res.json(authors);
            });
    }

    function findAuthoredBooksUserById(req, res) {
        var userId = req.params.userId;
        authoredBookModel
            .findAuthoredBooksForUser(userId)
            .then(function(authors) {
                res.json(authors);
            });
    }

    function removeAuthoredBook(req, res) {
        var bookId = req.params.bookId;
        var currentUser = req.session.currentUser;
        var userId = currentUser._id;
        var authored = {
            user: userId,
            book: bookId
        };

        authoredBookModel.deleteAuthoredBook(authored)
            .then(function (authored) {
                res.json(authored);
            })
    }

}