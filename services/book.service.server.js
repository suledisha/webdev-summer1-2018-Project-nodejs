module.exports = function (app) {
    app.post('/api/book', createBook);
    app.get('/api/book', findAllBooks);
    app.post('/api/book/id', findBookByCredentials);
    app.delete('/api/book/:bookId/delete', deleteBookById);

    var bookModel = require('../models/book/book.model.server');
    var likeModel = require('../models/like/like.model.server');
    var reviewModel = require('../models/review/review.model.server');
    var authoredBookModel = require('../models/authoredBook/authoredBook.model.server');


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

    function deleteBookById(req, res) {
        var bookId =req.params.bookId;
        var book ={
            _id: bookId
        }
        var query= {
            book : bookId
        }
        likeModel.deleteAllWithQuery(query)
            .then(function (err) {
            });
        reviewModel.deleteAllWithQuery(query)
            .then(function (err) {
            });
        authoredBookModel.deleteAllWithQuery(query)
            .then(function (err) {
            });
        bookModel.deleteBookById(book)
            .then(function (books) {
                res.send(books);
            })
    }

    function findBookByCredentials(req,res){
        var credentials = req.body;
        bookModel.findBookByCredentials(credentials)
            .then(function (book){
                if(book==null){
                    res.json({
                        _id: -1
                    })
                }
                else {
                    res.json(book);
                }
            })
    }



}