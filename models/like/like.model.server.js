var mongoose = require('mongoose');
var likeSchema = require('./like.schema.server');
var likeModel = mongoose.model('LikeModel', likeSchema
);

function userLikesBook(likes) {
    return likeModel.create(likes);
}
function userUnlikesBook(unlikes) {
    return likeModel.deleteOne(unlikes);
}
function deleteAllWithQuery(query) {
    return likeModel.deleteMany(query);
}

function findLikedBooksForUser(userId) {
    return likeModel
        .find({user: userId})
        .populate('book')
        .exec();
}
function findLikesForBooks(bookId) {
    return likeModel
        .find({book: bookId}).count()
}

module.exports = {
    userLikesBook:userLikesBook,
    userUnlikesBook: userUnlikesBook,
    findLikedBooksForUser:findLikedBooksForUser,
    findLikesForBooks: findLikesForBooks,
    deleteAllWithQuery: deleteAllWithQuery
};