module.exports = function (app) {
    app.post('/api/book', createBook);
    app.get('/api/book', findAllBooks);
    var bookModel = require('../models/book/book.model.server');

    function createBook(req, res) {
        var book = req.body;
        bookModel.createBook(book)
            .then(function (book) {
                res.send(book);
            })
    }

    function findAllBooks(req, res) {
        bookModel.findAllBooks()
            .then(function (books) {
                res.send(books);
            })
    }

}