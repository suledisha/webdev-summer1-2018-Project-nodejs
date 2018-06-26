module.exports = function (app) {
    app.get('/api/user', findAllUsers);
    app.get('/api/readers', findAllReaders);
    app.get('/api/authors', findAllAuthors);
    app.get('/api/user/:userId', findUserById);
    app.delete('/api/user/:userId', deleteUserById);
    app.post('/api/register', findUserByUsername)
    app.post('/api/user', createUser);
    app.get('/api/profile', profile);
    app.put('/api/profile', updateProfile);
    app.delete('/api/profile', deleteProfile);
    app.post('/api/logout', logout);
    app.post('/api/login', login);

    var userModel = require('../models/user/user.model.server');
    var likeModel = require('../models/like/like.model.server');
    var reviewModel = require('../models/review/review.model.server');
    var followModel = require('../models/follow/follow.model.server');
    var authoredBookModel = require('../models/authoredBook/authoredBook.model.server');

    function findAllReaders(req,res){
        userModel.findAllReaders()
            .then(function (users) {
                res.send(users);
            })
    }

    function findAllAuthors(req,res){
        userModel.findAllAuthors()
            .then(function (users) {
                res.send(users);
            })
    }


    function deleteUserById(req,res){
        var userId = req.params['userId'];
        var user ={
            _id: userId
        }
        var query= {
            user : userId
        }
        var follower ={
            follower: userId
        }
        var following ={
            following: userId
        }
        likeModel.deleteAllWithQuery(query)
            .then(function (err) {
        });
        reviewModel.deleteAllWithQuery(query)
            .then(function (err) {
            });
        followModel.deleteAllWithQuery(follower)
            .then(function (err) {
            });
        followModel.deleteAllWithQuery(following)
            .then(function (err) {
            });
        authoredBookModel.deleteAllWithQuery(query)
            .then(function (err) {
            });
        userModel.deleteUserById(user)
            .then(function (users) {
                res.send(users)
            })
    }
    function login(req,res){
        var credentials = req.body;
        userModel.findUserByCredentials(credentials)
            .then(function (user){
                if(user==null){
                    res.json({
                        _id: -1
                    })
                }
                else {
                    req.session['currentUser'] = user;
                    res.json(user);
                }
            })
    }

    function findUserByUsername(req,res){
        var credentials = req.body;
        userModel.findUserByCredentials(credentials)
            .then(function (user){
                if(user==null){
                    res.json({
                        _id: -1
                    })
                }
                else {
                    res.json(user);
                }
            })
    }

    function logout(req,res){
        req.session.destroy();
        res.send(200);
    }

    function findUserById(req, res) {
        var id = req.params['userId'];
        userModel.findUserById(id)
            .then(function (user) {
                res.json(user);
            })
    }

    function profile(req, res) {
        res.send(req.session['currentUser']);
    }

    function createUser(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.send(user);
            })
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }

    function updateProfile(req,res) {
        var user = req.body;
        userModel
            .updateUser(user)
            .then(function () {
                req.session['currentUser']=user;
                res.json(user);
            })
    }
    function deleteProfile(req,res){
        req.session.destroy();
        res.send(200);
    }

}