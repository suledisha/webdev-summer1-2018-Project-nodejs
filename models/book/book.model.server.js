var mongoose = require('mongoose');
var bookSchema = require('./book.schema.server');
var bookModel = mongoose.model('bookModel', bookSchema);

function createBook(user) {
    return bookModel.create(user);
}

function findAllBooks(){
    return bookModel.find();
}

var api = {
    createBook: createBook,
    findAllBooks: findAllBooks

};

module.exports = api;