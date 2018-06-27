module.exports = function (app) {

    app.get('/api/shelf', findShelvedBooksForUser);
    app.post('/api/book/:bookId/shelf', userShelvesBook);
    app.get('/api/book/:bookId/shelf', findShelfForBook);
    app.delete('/api/book/:bookId/unshelf', userUnShelvesBook);
    app.delete('/api/shelf/:shelfId/delete', deleteShelvedById);
    app.get('/api/allshelved', findAllShelved)
    app.get('/api/user/:userId/shelved', findShelvedBooksForUserById);


    var bookModel = require('../models/book/book.model.server');
    var shelfModel = require('../models/shelf/shelf.model.server');

    function deleteShelvedById(req,res){
        var shelfId =req.params.shelfId;
        var shelf ={
            _id: shelfId
        }
        shelfModel.deleteShelfById(shelf)
            .then(function (shelf) {
                res.send(shelf);
            })
    }

    function findShelfForBook(req, res) {
        var bookId =req.params.bookId;
        shelfModel.findShelvesForBook(bookId)
            .then(function(shelved) {
                res.json(shelved);
            });

    }

    function findAllShelved(req,res){
        shelfModel
            .findAllShelvedBooks()
            .then(function(shelved) {
                res.json(shelved);
            });
    }
    function findShelvedBooksForUser(req, res) {
        var currentUser = req.session.currentUser;
        var userId = currentUser._id;
        shelfModel
            .findShelfsForUser(userId)
            .then(function(shelved) {
                res.json(shelved);
            });
    }

    function findShelvedBooksForUserById(req, res) {
        var userId = req.params.userId;
        shelfModel
            .findShelfsForUser(userId)
            .then(function(shelved) {
                res.json(shelved);
            });
    }

    function userShelvesBook(req, res) {
        var bookId = req.params.bookId;
        var shelf= req.body;
        var currentUser = req.session.currentUser;
        var userId = currentUser._id;
        var shelved = {
            user: userId,
            book: bookId,
            title: shelf.title,
        };
        shelfModel.userShelvesBook(shelved)
            .then(function (shelved) {
                res.json(shelved);
            })
    }

    function userUnShelvesBook(req, res) {
        var bookId = req.params.bookId;
        var currentUser = req.session.currentUser;
        var userId = currentUser._id;
        var shelve = {
            user: userId,
            book: bookId
        };

        shelfModel.userUnshelvesBook(shelve)
            .then(function (shelve) {
                res.json(shelve);
            })
    }


}
