var mongoose = require('mongoose');
var bookSchema = require('./book.schema.server');
var bookModel = mongoose.model('bookModel', bookSchema);

function createBook(user) {
    return bookModel.create(user);
}


var api = {
    createBook: createBook,

};

module.exports = api;