var mongoose = require('mongoose');
var reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookModel'
    },
    title: String,
    text: String
}, {collection: 'review'});
module.exports = reviewSchema;