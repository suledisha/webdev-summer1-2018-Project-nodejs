var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('userModel', userSchema);

function findUserByCredentials(credentials) {
    return userModel.findOne(credentials);
}


function findUserById(userId) {
    return userModel.findById(userId);
}

function createUser(user) {
    return userModel.create(user);
}

function deleteUserById(user) {
    return userModel.deleteOne(user);
}

function findAllUsers() {
    return userModel.find();
}

function findAllAuthors(){
    return userModel.find({role : 'author'});
}

function findAllReaders(){
    return userModel.find({role : 'reader'});
}

function updateUser(user){
    return userModel.update({
        _id: user._id
    },{
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bio: user.bio,
        snippet: user.snippet

    });
}

var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findUserByCredentials:findUserByCredentials,
    updateUser : updateUser,
    deleteUserById: deleteUserById,
    findAllReaders: findAllReaders,
    findAllAuthors: findAllAuthors
};

module.exports = api;