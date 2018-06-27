var mongoose = require('mongoose');
var shelfSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookModel'
    },
    title: String,
}, {collection: 'shelf'
});
module.exports = shelfSchema;