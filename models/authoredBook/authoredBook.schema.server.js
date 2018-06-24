var mongoose = require('mongoose');
var authoredBookSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookModel'
    },
}, {collection: 'authoredBook'});
module.exports = authoredBookSchema;