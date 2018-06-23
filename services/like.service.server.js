module.exports = function (app) {

    app.get('/api/book/likes', findLikedBooksForUser);
    app.post('/api/book/:bookId/likes', userLikesBook);
    app.delete('/api/book/:bookId/unlikes', userUnlikesBook);

    var bookModel = require('../models/book/book.model.server');
    var likeModel = require('../models/like/like.model.server');

    function findLikedBooksForUser(req, res) {
        var currentUser = req.session.currentUser;
        var userId = currentUser._id;
        likeModel
            .findLikedBooksForUser(userId)
            .then(function(likes) {
                res.json(likes);
            });
    }

    function userLikesBook(req, res) {
        var bookId = req.params.bookId;
        var currentUser = req.session.currentUser;
        var userId = currentUser._id;
        var likes = {
            user: userId,
            book: bookId
        };
       likeModel.userLikesBook(likes)
           .then(function (likes) {
               res.json(likes);
           })
    }

    function userUnlikesBook(req, res) {
        var bookId = req.params.bookId;
        var currentUser = req.session.currentUser;
        var userId = currentUser._id;
        var likes = {
            user: userId,
            book: bookId
        };

        likeModel.userUnlikesBook(likes)
            .then(function (likes) {
                res.json(likes);
            })
    }


}
