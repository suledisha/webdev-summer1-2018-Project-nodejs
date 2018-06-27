var mongoose = require('mongoose');
var shelfSchema = require('./shelf.schema.server');
var shelfModel = mongoose.model('ShelfModel', shelfSchema);

function userShelvesBook(shelves) {
    return shelfModel.create(shelves);
}
function userUnshelvesBook(unshelve) {
    return shelfModel.deleteOne(unshelve);
}

function findAllShelvedBooks(){
    return shelfModel.find();
}
function findShelfsForUser(userId) {
    return shelfModel
        .find({user: userId})
        .populate('book')
        .exec();
}

function deleteAllWithQuery(query) {
    return shelfModel.deleteMany(query);
}

function findBooksWithQuery(query) {
    return shelfModel
        .find(query)
        .populate('book')
        .exec();
}

function findShelvesForBook(bookId) {
    return shelfModel
        .find({book: bookId})
        .populate('user')
        .exec();
}
function deleteShelfById(shelf) {
    return shelfModel.deleteOne(shelf);
}

module.exports = {
    userShelvesBook: userShelvesBook,
    userUnshelvesBook: userUnshelvesBook,
    findAllShelvedBooks: findAllShelvedBooks,
    findShelfsForUser: findShelfsForUser,
    deleteAllWithQuery: deleteAllWithQuery,
    findBooksWithQuery: findBooksWithQuery,
    findShelvesForBook: findShelvesForBook,
    deleteShelfById: deleteShelfById

};