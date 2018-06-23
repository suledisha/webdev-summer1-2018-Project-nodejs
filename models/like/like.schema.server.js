var mongoose = require('mongoose');
var likeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookModel'
    },
}, {collection: 'like'});
module.exports = likeSchema;