module.exports = function (app) {

    app.get('/api/book/reviews', findReviewedBooksForUser);
    app.post('/api/book/:bookId/reviews', userReviewsBook);
    app.delete('/api/book/:bookId/unreviews', userUnReviewsBook);
    app.delete('/api/review/:reviewId/delete', deleteReviewById);
    app.get('/api/allreviews', findAllReviews)
    app.get('/api/user/:userId/reviewed', findReviewedBooksForUserById);

    var bookModel = require('../models/book/book.model.server');
    var reviewModel = require('../models/review/review.model.server');

    function deleteReviewById(req,res){
        var reviewId =req.params.reviewId;
        var review ={
            _id: reviewId
        }
        reviewModel.deleteReviewById(review)
            .then(function (reviews) {
                res.send(reviews);
            })
    }

    function findAllReviews(req,res){
        reviewModel
            .findAllReviews()
            .then(function(reviews) {
                res.json(reviews);
            });
    }
    function findReviewedBooksForUser(req, res) {
        var currentUser = req.session.currentUser;
        var userId = currentUser._id;
        reviewModel
            .findReviewsForUser(userId)
            .then(function(reviews) {
                res.json(reviews);
            });
    }

    function findReviewedBooksForUserById(req, res) {
        var userId = req.params.userId;
        reviewModel
            .findReviewsForUser(userId)
            .then(function(reviews) {
                res.json(reviews);
            });
    }

    function userReviewsBook(req, res) {
        var bookId = req.params.bookId;
        var review= req.body;
        var currentUser = req.session.currentUser;
        var userId = currentUser._id;
        var reviews = {
            user: userId,
            book: bookId,
            title: review.title,
            text: review.text
        };
        reviewModel.userReviewsBook(reviews)
            .then(function (reviews) {
                res.json(reviews);
            })
    }

    function userUnReviewsBook(req, res) {
        var bookId = req.params.bookId;
        var currentUser = req.session.currentUser;
        var userId = currentUser._id;
        var reviews = {
            user: userId,
            book: bookId
        };

        reviewModel.userUnreviewBook(reviews)
            .then(function (reviews) {
                res.json(reviews);
            })
    }


}
