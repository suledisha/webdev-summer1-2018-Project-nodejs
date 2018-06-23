var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    role: String,
    bio: String,
    snippet: String
}, {collection: 'user'});

module.exports = userSchema;