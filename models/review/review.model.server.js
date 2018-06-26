var mongoose = require('mongoose');
var reviewSchema = require('./review.schema.server');
var reviewModel = mongoose.model('ReviewModel', reviewSchema);

function userReviewsBook(reviews) {
    return reviewModel.create(reviews);
}
function userUnreviewBook(reviews) {
    return reviewModel.deleteOne(reviews);
}

function findAllReviews(){
    return reviewModel.find();
}
function findReviewsForUser(userId) {
    return reviewModel
        .find({user: userId})
        .populate('book')
        .exec();
}

function findReviewsForBook(bookId) {
    return reviewModel
        .find({book: bookId})
        .populate('user')
        .exec();
}
function deleteReviewById(review) {
    return reviewModel.deleteOne(review);
}

module.exports = {
    userReviewsBook:userReviewsBook,
    userUnreviewBook: userUnreviewBook,
    findReviewsForUser:findReviewsForUser,
    findAllReviews: findAllReviews,
    deleteReviewById: deleteReviewById,
    findReviewsForBook: findReviewsForBook
};