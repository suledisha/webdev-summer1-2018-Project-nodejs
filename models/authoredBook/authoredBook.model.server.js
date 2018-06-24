var mongoose = require('mongoose');
var authoredBookSchema = require('./authoredBook.schema.server');
var authoredBookModel = mongoose.model('authoredBookModel', authoredBookSchema
);

function addAuthoredBook(authored) {
    return authoredBookModel.create(authored);
}
function deleteAuthoredBook(authored) {
    return authoredBookModel.deleteOne(authored);
}

function findAuthoredBooksForUser(userId) {
    return authoredBookModel
        .find({user: userId})
        .populate('book')
        .exec();
}

module.exports = {
    addAuthoredBook:addAuthoredBook,
    deleteAuthoredBook:deleteAuthoredBook,
    findAuthoredBooksForUser: findAuthoredBooksForUser
};