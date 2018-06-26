var mongoose = require('mongoose');
var bookSchema = require('./book.schema.server');
var bookModel = mongoose.model('bookModel', bookSchema);

function createBook(book) {
    return bookModel.create(book)
}

function findAllBooks(){
    return bookModel.find();
}

function deleteBookById(book) {
    return bookModel.deleteOne(book);
}
function findBookByCredentials(credentials) {
    return bookModel.findOne(credentials);
}

var api = {
    createBook: createBook,
    findAllBooks: findAllBooks,
    deleteBookById: deleteBookById,
    findBookByCredentials: findBookByCredentials

};

module.exports = api;