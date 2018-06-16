var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
   id:String,
    title:String
}, {collection: 'book'});

module.exports = bookSchema;