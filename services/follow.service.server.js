module.exports = function (app) {

    app.get('/api/userfollows', findFollowingForUser);
    app.get('/api/user/:userId/userfollows', findFollowingForUserById);
    app.get('/api/userfollowedby', findFollowedByForUser);
    app.get('/api/user/:userId/userfollowedby', findFollowedByForUserById);
    app.post('/api/userfollows/:userId/follows', userFollowsUser);
    app.delete('/api/userfollows/:userId/unfollows', userUnfollowsUser);


    var followModel = require('../models/follow/follow.model.server');

    function findFollowingForUser(req, res) {
        var currentUser = req.session.currentUser;
        var userId = currentUser._id;
        followModel
            .findFollowingForUser(userId)
            .then(function(follows) {
                res.json(follows);
            });
    }

    function findFollowingForUserById(req, res) {
        var userId = req.params.userId;
        followModel
            .findFollowingForUser(userId)
            .then(function(follows) {
                res.json(follows);
            });
    }

    function findFollowedByForUser(req, res) {
        var currentUser = req.session.currentUser;
        var userId = currentUser._id;
        followModel
            .findFollowedByForUser(userId)
            .then(function(followedby) {
                res.json(followedby);
            });
    }

    function findFollowedByForUserById(req, res) {
        var userId = req.params.userId;
        followModel
            .findFollowedByForUser(userId)
            .then(function(followedby) {
                res.json(followedby);
            });
    }

    function userFollowsUser(req, res) {
        var followingId = req.params.userId;
        var currentUser = req.session.currentUser;
        var followerId = currentUser._id;
        var follows = {
            follower: followerId,
            following: followingId
        };
        followModel.userFollowsUser(follows)
            .then(function (follows) {
                res.json(follows);
            })
    }

    function userUnfollowsUser(req, res) {
        var followingId = req.params.userId;
        var currentUser = req.session.currentUser;
        var followerId = currentUser._id;
        var follows = {
            follower: followerId,
            following: followingId
        };

        followModel.userUnfollowsUser(follows)
            .then(function (follows) {
                res.json(follows);
            })
    }


}
