var mongoose = require('mongoose');
var reviewSchema = require('./review.schema.server');
var reviewModel = mongoose.model('ReviewModel', reviewSchema);

function userReviewsBook(reviews) {
    return reviewModel.create(reviews);
}
function userUnreviewBook(reviews) {
    return reviewModel.deleteOne(reviews);
}

function findReviewsForUser(userId) {
    return reviewModel
        .find({user: userId})
        .populate('book')
        .exec();
}


module.exports = {
    userReviewsBook:userReviewsBook,
    userUnreviewBook: userUnreviewBook,
    findReviewsForUser:findReviewsForUser
};