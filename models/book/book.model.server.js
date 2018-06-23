var mongoose = require('mongoose');
var bookSchema = require('./book.schema.server');
var bookModel = mongoose.model('bookModel', bookSchema);

function createBook(book) {
    return bookModel.create(book)
}

function findAllBooks(){
    return bookModel.find();
}

var api = {
    createBook: createBook,
    findAllBooks: findAllBooks

};

module.exports = api;